from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContratViewSet, ContratAdminViewSet, FactureViewSet, FactureAdminViewSet

router = DefaultRouter()
router.register('contrats', ContratViewSet, basename='contrats')
router.register('factures', FactureViewSet, basename='factures')
router.register('admin/contrats', ContratAdminViewSet, basename='admin-contrats')
router.register('admin/factures', FactureAdminViewSet, basename='admin-factures')

urlpatterns = [path('', include(router.urls))]
