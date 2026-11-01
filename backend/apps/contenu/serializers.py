from rest_framework import serializers
from .models import ContenuAccueil


class ContenuAccueilSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContenuAccueil
        fields = (
            'titre_ligne_1',
            'titre_ligne_2',
            'sous_titre',
            'bouton_principal_texte',
            'bouton_secondaire_texte',
            'updated_at',
        )
        read_only_fields = fields
