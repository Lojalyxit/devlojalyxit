from django.utils import timezone
from rest_framework import viewsets, permissions
from apps.accounts.permissions import IsAdminRole
from .models import Ticket
from .serializers import TicketSerializer, TicketAdminSerializer


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Ticket.objects.select_related('user', 'contrat')
        if user.role == 'admin':
            statut = self.request.query_params.get('statut')
            if statut:
                qs = qs.filter(statut=statut)
            return qs
        return qs.filter(user=user)

    def perform_update(self, serializer):
        instance = serializer.instance
        new_statut = serializer.validated_data.get('statut', instance.statut)
        kwargs = {}
        if new_statut == 'resolu' and instance.statut != 'resolu':
            kwargs['resolved_at'] = timezone.now()
        serializer.save(**kwargs)


class TicketAdminViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.select_related('user', 'contrat').all()
    serializer_class = TicketAdminSerializer
    permission_classes = [IsAdminRole]

    def get_queryset(self):
        qs = super().get_queryset()
        statut = self.request.query_params.get('statut')
        priorite = self.request.query_params.get('priorite')
        if statut:
            qs = qs.filter(statut=statut)
        if priorite:
            qs = qs.filter(priorite=priorite)
        return qs
