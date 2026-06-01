from django.contrib import admin
from django.utils.html import format_html
from .models import Contrat, ContratService, Facture


def marquer_payee(modeladmin, request, queryset):
    updated = queryset.update(statut='payee')
    modeladmin.message_user(request, f'{updated} facture(s) marquée(s) payée(s)')
marquer_payee.short_description = 'Marquer sélection comme payée'


class ContratServiceInline(admin.TabularInline):
    model = ContratService
    extra = 0


class FactureInline(admin.TabularInline):
    model = Facture
    extra = 0
    readonly_fields = ('montant_ht_display',)

    @admin.display(description='Montant HT')
    def montant_ht_display(self, obj):
        return f'{obj.montant_ht:,.0f} GNF' if obj.pk else '—'


@admin.register(Contrat)
class ContratAdmin(admin.ModelAdmin):
    list_display = ('numero', 'user', 'formule_badge', 'montant_mensuel', 'statut_badge', 'date_debut', 'date_fin')
    list_filter = ('statut', 'formule', 'date_debut')
    search_fields = ('numero', 'user__email', 'user__full_name')
    date_hierarchy = 'date_debut'
    inlines = [ContratServiceInline, FactureInline]
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

    @admin.display(description='Formule')
    def formule_badge(self, obj):
        colors = {'starter': '#999', 'pro': '#628059', 'premium': '#C9A86A'}
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px">{}</span>',
            colors.get(obj.formule, '#999'), obj.formule
        )

    @admin.display(description='Statut', ordering='statut')
    def statut_badge(self, obj):
        colors = {'actif': '#559540', 'suspendu': '#C9A86A', 'termine': '#999'}
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px">{}</span>',
            colors.get(obj.statut, '#999'), obj.statut
        )


@admin.register(Facture)
class FactureAdmin(admin.ModelAdmin):
    list_display = ('numero', 'contrat', 'montant_ttc', 'statut_badge', 'date_emission', 'date_echeance')
    list_filter = ('statut', 'date_echeance')
    search_fields = ('numero', 'contrat__numero')
    date_hierarchy = 'date_emission'
    actions = [marquer_payee]

    @admin.display(description='Statut', ordering='statut')
    def statut_badge(self, obj):
        colors = {'payee': '#559540', 'impayee': '#C9A86A', 'en_retard': '#FE2B54'}
        return format_html(
            '<span style="background:{};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px">{}</span>',
            colors.get(obj.statut, '#999'), obj.statut
        )
