from rest_framework import viewsets, permissions
from apps.accounts.permissions import IsAdminRole, IsOwnerOrAdmin
from .models import Contrat, Facture
from .serializers import ContratSerializer, FactureSerializer


class ContratViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ContratSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Contrat.objects.select_related('user').prefetch_related(
            'contrat_services__service', 'factures'
        )
        if user.role == 'admin':
            statut = self.request.query_params.get('statut')
            if statut:
                qs = qs.filter(statut=statut)
            return qs
        return qs.filter(user=user)


class ContratAdminViewSet(viewsets.ModelViewSet):
    queryset = Contrat.objects.select_related('user').prefetch_related(
        'contrat_services__service', 'factures'
    )
    serializer_class = ContratSerializer
    permission_classes = [IsAdminRole]

    def get_queryset(self):
        qs = super().get_queryset()
        statut = self.request.query_params.get('statut')
        if statut:
            qs = qs.filter(statut=statut)
        return qs


class FactureViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FactureSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Facture.objects.select_related('contrat__user')
        if user.role == 'admin':
            statut = self.request.query_params.get('statut')
            if statut:
                qs = qs.filter(statut=statut)
            return qs
        return qs.filter(contrat__user=user)


class FactureAdminViewSet(viewsets.ModelViewSet):
    queryset = Facture.objects.select_related('contrat__user')
    serializer_class = FactureSerializer
    permission_classes = [IsAdminRole]
