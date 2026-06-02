from rest_framework import viewsets, permissions
from apps.accounts.permissions import IsAdminRole
from .models import Formation, Session, Inscription
from .serializers import (
    FormationSerializer, FormationListSerializer,
    SessionSerializer, InscriptionSerializer,
)


class FormationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Formation.objects.prefetch_related('sessions', 'modules').all()
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return FormationListSerializer
        return FormationSerializer


class FormationAdminViewSet(viewsets.ModelViewSet):
    queryset = Formation.objects.prefetch_related('sessions', 'modules').all()
    serializer_class = FormationSerializer
    permission_classes = [IsAdminRole]
    lookup_field = 'slug'


class SessionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SessionSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Session.objects.prefetch_related('inscriptions').select_related('formation')
        formation_id = self.request.query_params.get('formation')
        if formation_id:
            qs = qs.filter(formation_id=formation_id)
        return qs.filter(statut='ouverte')


class SessionAdminViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.select_related('formation').prefetch_related('inscriptions')
    serializer_class = SessionSerializer
    permission_classes = [IsAdminRole]

    def get_queryset(self):
        qs = super().get_queryset()
        statut = self.request.query_params.get('statut')
        if statut:
            qs = qs.filter(statut=statut)
        return qs


class InscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = InscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Inscription.objects.select_related('session__formation', 'user')
        if user.role == 'admin':
            statut = self.request.query_params.get('statut')
            if statut:
                qs = qs.filter(statut=statut)
            return qs
        return qs.filter(user=user)
