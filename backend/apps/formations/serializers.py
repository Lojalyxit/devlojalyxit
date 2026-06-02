from rest_framework import serializers
from .models import Formation, FormationModule, Session, Inscription


class FormationModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormationModule
        fields = ('id', 'titre', 'ordre', 'duree_heures', 'objectifs', 'contenu', 'video_url', 'video_disponible')


class SessionSerializer(serializers.ModelSerializer):
    formation_titre = serializers.CharField(source='formation.titre', read_only=True)
    places_restantes = serializers.SerializerMethodField()

    class Meta:
        model = Session
        fields = '__all__'

    def get_places_restantes(self, obj):
        confirmed = obj.inscriptions.filter(statut__in=['confirmee', 'payee']).count()
        return max(obj.places_max - confirmed, 0)


class FormationSerializer(serializers.ModelSerializer):
    sessions = SessionSerializer(many=True, read_only=True)
    modules = FormationModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Formation
        fields = '__all__'


class FormationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ('id', 'slug', 'titre', 'domaine', 'duree_heures', 'niveau', 'tarif_min_gnf', 'tarif_max_gnf')


class InscriptionSerializer(serializers.ModelSerializer):
    session_info = SessionSerializer(source='session', read_only=True)

    class Meta:
        model = Inscription
        fields = '__all__'
        read_only_fields = ('user', 'statut', 'created_at')

    def create(self, validated_data):
        user = self.context['request'].user
        inscription = Inscription.objects.create(user=user, **validated_data)
        inscription.session.refresh_statut()
        return inscription
