from django.contrib import admin
from .models import Formation, FormationModule, Session, Inscription


class FormationModuleInline(admin.StackedInline):
    model = FormationModule
    extra = 0
    ordering = ['ordre']
    fields = ('ordre', 'titre', 'duree_heures', 'objectifs', 'contenu', 'video_url', 'video_disponible')
    show_change_link = True


class SessionInline(admin.TabularInline):
    model = Session
    extra = 0


@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    list_display = ('titre', 'domaine', 'niveau', 'duree_heures', 'certification', 'tarif_min_gnf', 'tarif_max_gnf')
    list_filter = ('domaine', 'niveau')
    search_fields = ('titre', 'domaine', 'certification')
    prepopulated_fields = {'slug': ('titre',)}
    inlines = [FormationModuleInline, SessionInline]


@admin.register(FormationModule)
class FormationModuleAdmin(admin.ModelAdmin):
    list_display = ('formation', 'ordre', 'titre', 'duree_heures', 'video_disponible', 'video_url')
    list_filter = ('formation', 'video_disponible')
    list_editable = ('video_disponible',)
    search_fields = ('titre', 'formation__titre')
    ordering = ('formation', 'ordre')
    fieldsets = (
        (None, {'fields': ('formation', 'ordre', 'titre', 'duree_heures')}),
        ('Contenu pédagogique', {'fields': ('objectifs', 'contenu')}),
        ('Vidéo', {'fields': ('video_disponible', 'video_url'), 'description': 'Renseigner l\'URL et cocher "Disponible" pour activer le lecteur vidéo.'}),
    )


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
