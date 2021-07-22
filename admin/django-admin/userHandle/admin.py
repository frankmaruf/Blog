from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm
from .models import User,Permission,Role
# Register your models here.


class UserAdminArea(admin.AdminSite):
    site_header = 'User Database'


userAdmin_site = UserAdminArea(name="UserAdmin")

userAdmin_site.register(User)


# @admin.register(Author, Reader, Editor, site=custom_admin_site)
# class PersonAdmin(admin.ModelAdmin):
#     pass


admin.site.register(User)
admin.site.register(Permission)
admin.site.register(Role)