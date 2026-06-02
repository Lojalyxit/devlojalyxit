from rest_framework import serializers
from apps.services.models import Service
from .models import Devis, DevisService


class DevisCreateSerializer(serializers.ModelSerializer):
    service_ids = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), many=True, write_only=True
    )
    id = serializers.IntegerField(read_only=True)  # retourné après création pour le rattachement

    class Meta:
        model = Devis
        fields = ('id', 'nom', 'societe', 'email', 'telephone', 'besoin', 'budget', 'echeance', 'service_ids')

    def create(self, validated_data):
        services = validated_data.pop('service_ids', [])
        devis = Devis.objects.create(**validated_data)
        DevisService.objects.bulk_create([
            DevisService(devis=devis, service=s) for s in services
        ])
        return devis


class DevisServiceSerializer(serializers.ModelSerializer):
    service_titre = serializers.CharField(source='service.titre', read_only=True)

    class Meta:
        model = DevisService
        fields = ('service', 'service_titre')


class DevisSerializer(serializers.ModelSerializer):
    services = DevisServiceSerializer(source='devis_services', many=True, read_only=True)

    class Meta:
        model = Devis
        fields = '__all__'
