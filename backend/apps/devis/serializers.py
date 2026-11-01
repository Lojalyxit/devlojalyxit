from rest_framework import serializers
from apps.services.models import Service
from .models import Devis, DevisService, MessageContact


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


class MessageContactSerializer(serializers.ModelSerializer):
    # Champ piège anti-spam (honeypot) : invisible pour un humain, rempli par les robots
    site_web = serializers.CharField(required=False, allow_blank=True, write_only=True, max_length=200)

    class Meta:
        model = MessageContact
        fields = ('id', 'nom', 'email', 'telephone', 'sujet', 'formation', 'message', 'site_web')
        read_only_fields = ('id',)

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError('Votre message est trop court (10 caractères minimum).')
        return value
