from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DevisCreateView, DevisListView, DevisAdminViewSet

router = DefaultRouter()
router.register('admin/devis', DevisAdminViewSet, basename='admin-devis')

urlpatterns = [
    path('devis/', DevisCreateView.as_view(), name='devis-create'),
    path('devis/mes-devis/', DevisListView.as_view(), name='devis-list'),
    path('', include(router.urls)),
]
