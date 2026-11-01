from django.contrib import admin
from django.shortcuts import redirect
from django.urls import reverse
from .models import ContenuAccueil


@admin.register(ContenuAccueil)
class ContenuAccueilAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Titre', {'fields': ('titre_ligne_1', 'titre_ligne_2')}),
        ('Texte', {'fields': ('sous_titre',)}),
        ('Boutons', {'fields': ('bouton_principal_texte', 'bouton_secondaire_texte')}),
    )
    readonly_fields = ('updated_at',)

    def has_add_permission(self, request):
        return not ContenuAccueil.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        # Une seule ligne : on ouvre directement le formulaire d'édition
        obj = ContenuAccueil.load()
        return redirect(reverse('admin:contenu_contenuaccueil_change', args=[obj.pk]))
