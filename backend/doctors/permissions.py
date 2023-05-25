from rest_framework.permissions import BasePermission
import jwt


class IsRegular(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "Regular" or request.user.role == "Moderator" or request.user.role == "Admin"

    def has_object_permission(self, request, view, obj):
        return (request.user.role == "Regular" and obj.createdBy == request.user) or request.user.role == "Moderator" or request.user.role == "Admin"


class IsModerator(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "Moderator" or request.user.role == "Admin"


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "Admin"
