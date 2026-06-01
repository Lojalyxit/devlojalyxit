from django.contrib import admin
from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('ordre', 'titre', 'slug', 'icone')
    list_editable = ('ordre',)
    prepopulated_fields = {'slug': ('titre',)}
    search_fields = ('titre',)
