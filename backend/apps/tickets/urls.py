from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, TicketAdminViewSet

router = DefaultRouter()
router.register('tickets', TicketViewSet, basename='tickets')
router.register('admin/tickets', TicketAdminViewSet, basename='admin-tickets')

urlpatterns = [path('', include(router.urls))]
