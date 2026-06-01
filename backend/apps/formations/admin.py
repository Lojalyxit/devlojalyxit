from django.contrib import admin
from .models import Formation, Session, Inscription


class SessionInline(admin.TabularInline):
    model = Session
    extra = 0


@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    list_display = ('titre', 'domaine', 'niveau', 'duree_heures', 'tarif_min_gnf', 'tarif_max_gnf')
    list_filter = ('domaine', 'niveau')
    search_fields = ('titre', 'domaine')
    prepopulated_fields = {'slug': ('titre',)}
    inlines = [SessionInline]


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ('formation', 'date_debut', 'date_fin', 'format', 'places_max', 'statut')
    list_filter = ('statut', 'format')
    search_fields = ('formation__titre',)


@admin.register(Inscription)
class InscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'session', 'formule', 'mode_paiement', 'statut', 'created_at')
    list_filter = ('statut', 'formule')
    search_fields = ('user__email', 'session__formation__titre')
    list_editable = ('statut',)
