from django.db import models


class Service(models.Model):
    slug = models.SlugField(unique=True, max_length=100)
    titre = models.CharField(max_length=200)
    description = models.TextField()
    icone = models.CharField(max_length=100, blank=True, help_text='Nom de l\'icône (ex: server, code, network)')
    ordre = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['ordre']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def __str__(self):
        return self.titre
