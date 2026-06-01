from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = [('client', 'Client'), ('admin', 'Administrateur')]

    username = None  # email remplace username comme identifiant
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=200, blank=True)
    company = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client', db_index=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'

    def __str__(self):
        return self.email

    @property
    def is_admin_role(self):
        return self.role == 'admin'
