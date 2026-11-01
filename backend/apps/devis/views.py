import logging
from django.conf import settings
from django.core.mail import EmailMessage
from django.utils import timezone
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle

from apps.accounts.permissions import IsAdminRole
from .models import Devis, MessageContact
from .serializers import DevisCreateSerializer, DevisSerializer, MessageContactSerializer

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


# ── Formulaire de contact ────────────────────────────────────────────────────

class MessageContactCreateView(generics.CreateAPIView):
    """
    POST /api/contact/ — formulaire de la page Contact (public).
    Anti-spam : champ piège « site_web » + limitation de débit (scope « contact »).
    """
    serializer_class = MessageContactSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Robot détecté : on répond comme si tout allait bien, sans rien enregistrer ni envoyer
        if serializer.validated_data.pop('site_web', ''):
            logger.warning('Message de contact ignoré (honeypot rempli) depuis %s', request.META.get('REMOTE_ADDR'))
            return Response({'ok': True}, status=status.HTTP_201_CREATED)

        message = serializer.save()
        message.email_envoye = _envoyer_notification_contact(message)
        message.save(update_fields=['email_envoye'])
        return Response({'ok': True, 'id': message.pk}, status=status.HTTP_201_CREATED)


def _envoyer_notification_contact(message: MessageContact) -> bool:
    """Notifie l'équipe par email. Ne lève jamais d'exception ; retourne True si l'envoi a réussi."""
    try:
        date_fr = timezone.localtime(message.created_at).strftime('%d/%m/%Y à %H:%M')
        separateur = '=' * 60
        corps = '\n'.join([
            f'Nouveau message reçu depuis le formulaire de contact le {date_fr}.',
            separateur,
            '',
            f'  Nom        : {message.nom}',
            f'  Email      : {message.email}',
            f'  Téléphone  : {message.telephone or "—"}',
            f'  Sujet      : {message.sujet}',
            f'  Formation  : {message.formation or "—"}',
            '',
            'MESSAGE',
            message.message,
            '',
            separateur,
            'Répondez directement à cet email pour écrire au client.',
            f'Historique : admin Django > Devis > Messages de contact (#{message.pk}).',
            '',
            '-- LojalyxIT (notification automatique)',
        ])
        EmailMessage(
            subject=f'[LojalyxIT] Contact ({message.sujet}) — {message.nom}',
            body=corps,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.DEVIS_NOTIFICATION_EMAIL],
            reply_to=[message.email],
        ).send(fail_silently=False)
        logger.info('Email contact #%s envoyé à %s', message.pk, settings.DEVIS_NOTIFICATION_EMAIL)
        return True
    except Exception as exc:
        # Le message reste enregistré en base même si l'email échoue
        logger.error('Échec envoi email contact #%s : %s', message.pk, exc, exc_info=True)
        return False
