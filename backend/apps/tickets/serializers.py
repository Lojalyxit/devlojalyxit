from rest_framework import serializers
from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    sla = serializers.DictField(read_only=True)
    client_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ('user', 'statut', 'created_at', 'resolved_at')

    def create(self, validated_data):
        return Ticket.objects.create(user=self.context['request'].user, **validated_data)


class TicketAdminSerializer(serializers.ModelSerializer):
    sla = serializers.DictField(read_only=True)
    client_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'
