from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html
from .models import Ticket


def make_statut_action(statut, label):
    def action(modeladmin, request, queryset):
        kwargs = {'statut': statut}
        if statut == 'resolu':
            kwargs['resolved_at'] = timezone.now()
        updated = queryset.update(**kwargs)
        modeladmin.message_user(request, f'{updated} ticket(s) mis à jour → {statut}')
    action.short_description = label
    action.__name__ = f'marquer_{statut}'
    return action


PRIORITE_COLORS = {
    'critique': '#FE2B54', 'haute': '#C9A86A', 'normale': '#999', 'faible': '#ccc',
}
STATUT_COLORS = {
    'ouvert': '#C9A86A', 'en_cours': '#559540', 'resolu': '#28a745', 'ferme': '#999',
}


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('pk', 'sujet', 'user', 'priorite_badge', 'statut_badge', 'created_at', 'resolved_at')
    list_filter = ('statut', 'priorite', 'created_at')
    search_fields = ('sujet', 'user__email')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'resolved_at')
    ordering = ('-created_at',)
    actions = [
        make_statut_action('en_cours', 'Passer en cours'),
        make_statut_action('resolu', 'Marquer comme résolu'),
        make_statut_action('ferme', 'Fermer le ticket'),
    ]

    @admin.display(description='Priorité', ordering='priorite')
    def priorite_badge(self, obj):
        color = PRIORITE_COLORS.get(obj.priorite, '#999')
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px">{}</span>',
            color, obj.priorite
        )

    @admin.display(description='Statut', ordering='statut')
    def statut_badge(self, obj):
        color = STATUT_COLORS.get(obj.statut, '#999')
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px">{}</span>',
            color, obj.statut
        )
