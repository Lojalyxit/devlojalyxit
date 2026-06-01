from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):
    """Réservé aux utilisateurs avec role='admin'."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')


class IsClientRole(BasePermission):
    """Réservé aux utilisateurs avec role='client'."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'client')


class IsOwnerOrAdmin(BasePermission):
    """L'objet doit appartenir à l'utilisateur ou l'utilisateur est admin."""

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'admin':
            return True
        owner = getattr(obj, 'user', None)
        return owner == request.user
