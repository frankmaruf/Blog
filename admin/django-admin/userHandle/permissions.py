from rest_framework import permissions
from .serializers import UserSerializer


class ViewPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        data = UserSerializer(request.user).data

        view_access = any(p['name'] == 'view_' + view.permission_object for p in data['role']['permissions'])
        edit_access = any(p['name'] == 'update_' or 'create_' + view.permission_object for p in data['role']['permissions'])
        admin_access = any(p['name'] == 'edit_' or 'create_' or 'update_' + view.permission_object for p in data['role']['permissions'])

        if request.method == 'GET':
            return view_access or edit_access or admin_access
        if request.method == 'POST':
            return edit_access or admin_access
