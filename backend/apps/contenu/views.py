from rest_framework import generics, permissions
from .models import ContenuAccueil
from .serializers import ContenuAccueilSerializer


class ContenuAccueilView(generics.RetrieveAPIView):
    """GET /api/contenu-accueil/ — lecture seule, publique."""

    serializer_class = ContenuAccueilSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def get_object(self):
        return ContenuAccueil.load()
