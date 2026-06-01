from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FormationViewSet, FormationAdminViewSet,
    SessionViewSet, SessionAdminViewSet,
    InscriptionViewSet,
)

router = DefaultRouter()
router.register('formations', FormationViewSet, basename='formations')
router.register('sessions', SessionViewSet, basename='sessions')
router.register('inscriptions', InscriptionViewSet, basename='inscriptions')
router.register('admin/formations', FormationAdminViewSet, basename='admin-formations')
router.register('admin/sessions', SessionAdminViewSet, basename='admin-sessions')

urlpatterns = [path('', include(router.urls))]
