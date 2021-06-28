from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm
from .models import User,Permission,Role
# Register your models here.

admin.site.register(User)
admin.site.register(Permission)
admin.site.register(Role)