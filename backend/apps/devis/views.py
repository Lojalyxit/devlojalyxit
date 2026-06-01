from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework import status

from apps.accounts.permissions import IsAdminRole, IsOwnerOrAdmin
from .models import Devis
from .serializers import DevisCreateSerializer, DevisSerializer


class DevisCreateView(generics.CreateAPIView):
    queryset = Devis.objects.all()
    serializer_class = DevisCreateSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        devis = serializer.save(user=user)
        self._notify_ceo(devis)

    def _notify_ceo(self, devis: Devis):
        services_list = ', '.join(
            ds.service.titre for ds in devis.devis_services.select_related('service').all()
        ) or 'Non précisé'
        subject = f'[LojalyxIT] Nouvelle demande de devis #{devis.pk} — {devis.nom}'
        message = (
            f'Nouvelle demande de devis reçue :\n\n'
            f'Nom : {devis.nom}\n'
            f'Société : {devis.societe or "—"}\n'
            f'Email : {devis.email}\n'
            f'Téléphone : {devis.telephone or "—"}\n'
            f'Services : {services_list}\n'
            f'Budget : {devis.budget or "—"}\n'
            f'Échéance : {devis.echeance or "—"}\n\n'
            f'Besoin :\n{devis.besoin}\n\n'
            f'Voir dans l\'admin : /admin/devis/devis/{devis.pk}/change/'
        )
        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.CEO_EMAIL])
        except Exception:
            pass  # Ne pas bloquer la réponse si l'email échoue


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
