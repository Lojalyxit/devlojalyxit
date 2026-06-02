import logging
from django.conf import settings
from django.core.mail import EmailMessage
from django.utils import timezone
from rest_framework import generics, permissions, viewsets

from apps.accounts.permissions import IsAdminRole
from .models import Devis
from .serializers import DevisCreateSerializer, DevisSerializer

logger = logging.getLogger(__name__)


class DevisCreateView(generics.CreateAPIView):
    queryset = Devis.objects.all()
    serializer_class = DevisCreateSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        devis = serializer.save(user=user)
        _envoyer_notification_devis(devis)


class DevisListView(generics.ListAPIView):
    serializer_class = DevisSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Devis.objects.prefetch_related('devis_services__service').all()
        return Devis.objects.prefetch_related('devis_services__service').filter(user=user)


class DevisAdminViewSet(viewsets.ModelViewSet):
    queryset = Devis.objects.prefetch_related('devis_services__service').all()
    serializer_class = DevisSerializer
    permission_classes = [IsAdminRole]

    def get_queryset(self):
        qs = super().get_queryset()
        statut = self.request.query_params.get('statut')
        if statut:
            qs = qs.filter(statut=statut)
        return qs


# ── Notification email ────────────────────────────────────────────────────────

def _envoyer_notification_devis(devis: Devis) -> None:
    """
    Envoie un email de notification à DEVIS_NOTIFICATION_EMAIL après
    l'enregistrement d'un devis. Jamais bloquant : toute exception est
    loggée mais n'interrompt pas la réponse HTTP.
    """
    try:
        services_list = (
            ', '.join(
                ds.service.titre
                for ds in devis.devis_services.select_related('service').all()
            )
            or 'Non précisé'
        )

        date_fr = devis.created_at.strftime('%d/%m/%Y à %H:%M')
        admin_url = f'http://localhost:8000/admin/devis/devis/{devis.pk}/change/'

        sujet = f'[LojalyxIT] Nouvelle demande de devis #{devis.pk} — {devis.nom}'

        corps = (
            f'Bonjour,\n\n'
            f'Une nouvelle demande de devis a été soumise le {date_fr}.\n'
            f'{'=' * 60}\n\n'
            f'INFORMATIONS CLIENT\n'
            f'  Nom          : {devis.nom}\n'
            f'  Société      : {devis.societe or "—"}\n'
            f'  Email        : {devis.email}\n'
            f'  Téléphone    : {devis.telephone or "—"}\n\n'
            f'DEMANDE\n'
            f'  Services     : {services_list}\n'
            f'  Budget       : {devis.budget or "—"}\n'
            f'  Échéance     : {devis.echeance or "—"}\n\n'
            f'DESCRIPTION DU BESOIN\n'
            f'{devis.besoin}\n\n'
            f'{'=' * 60}\n'
            f'Gérer ce devis dans l\'admin :\n'
            f'{admin_url}\n\n'
            f'-- LojalyxIT (notification automatique)'
        )

        msg = EmailMessage(
            subject=sujet,
            body=corps,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.DEVIS_NOTIFICATION_EMAIL],
            reply_to=[devis.email],  # Répondre directement au client
        )
        msg.send(fail_silently=False)

        logger.info(
            'Email devis #%s envoyé à %s (client : %s)',
            devis.pk, settings.DEVIS_NOTIFICATION_EMAIL, devis.email,
        )

    except Exception as exc:
        # L'email ne doit JAMAIS faire échouer l'enregistrement du devis
        logger.error(
            'Échec envoi email devis #%s → %s : %s',
            devis.pk, settings.DEVIS_NOTIFICATION_EMAIL, exc,
            exc_info=True,
        )
