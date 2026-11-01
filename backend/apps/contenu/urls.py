from django.urls import path
from .views import ContenuAccueilView

urlpatterns = [
    path('contenu-accueil/', ContenuAccueilView.as_view(), name='contenu-accueil'),
]
