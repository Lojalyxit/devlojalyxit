from rest_framework import serializers
from .models import Contrat, ContratService, Facture


class ContratServiceSerializer(serializers.ModelSerializer):
    service_titre = serializers.CharField(source='service.titre', read_only=True)

    class Meta:
        model = ContratService
        fields = ('service', 'service_titre')


class FactureSerializer(serializers.ModelSerializer):
    montant_ht = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = Facture
        fields = '__all__'


class ContratSerializer(serializers.ModelSerializer):
    services = ContratServiceSerializer(source='contrat_services', many=True, read_only=True)
    factures = FactureSerializer(many=True, read_only=True)
    client_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Contrat
        fields = '__all__'
