from django.contrib import admin
from django.utils.html import format_html
from .models import Devis, DevisService


def make_statut_action(statut, label):
    def action(modeladmin, request, queryset):
        updated = queryset.update(statut=statut)
        modeladmin.message_user(request, f'{updated} devis mis à jour → {statut}')
    action.short_description = label
    action.__name__ = f'marquer_{statut}'
    return action


class DevisServiceInline(admin.TabularInline):
    model = DevisService
    extra = 0
    autocomplete_fields = ('service',)


@admin.register(Devis)
class DevisAdmin(admin.ModelAdmin):
    list_display = ('pk', 'nom', 'societe', 'email', 'statut_badge', 'budget', 'created_at')
    list_filter = ('statut', 'created_at')
    search_fields = ('nom', 'societe', 'email')
    list_editable = ('statut',)
    date_hierarchy = 'created_at'
    inlines = [DevisServiceInline]
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
    actions = [
        make_statut_action('en_cours', 'Marquer comme "En cours"'),
        make_statut_action('envoye', 'Marquer comme "Envoyé"'),
        make_statut_action('gagne', 'Marquer comme "Gagné"'),
        make_statut_action('perdu', 'Marquer comme "Perdu"'),
    ]

    @admin.display(description='Statut', ordering='statut')
    def statut_badge(self, obj):
        colors = {
            'nouveau': '#C9A86A', 'en_cours': '#559540',
            'envoye': '#628059', 'gagne': '#28a745', 'perdu': '#FE2B54',
        }
        color = colors.get(obj.statut, '#999')
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px">{}</span>',
            color, obj.statut
        )
