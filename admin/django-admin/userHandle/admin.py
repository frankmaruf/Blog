from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm
from .models import User,Permission,Role
from django.contrib import messages
# Register your models here.


class UserAdminArea(admin.AdminSite):
    site_header = 'User Database'

class TestAdminPermissions(admin.ModelAdmin):
    def has_view_permission(self,request,obj=None):
        return True
    def has_add_permission(self,request):
        return True
    def has_change_permission(self,request,obj=None):
        return True
    def has_delete_permission(self,request,obj=None):
        return True
    #def has_delete_permission(self,request,obj=None):
        #return obj is None or obj.pk != 33
    #def has_delete_permission(self,request,obj=None):
        #return obj is None or obj.title != "Any Model table or"
    #def has_delete_permission(self,request,obj=None):
        #if request.user.groups.filter(name="editors").exists():
            #return True
        #return False
   # def has_delete_permission(self,request,obj=None):
       # if obj != None and request.POST.get("action") == 'delete_selected':
           # messages.add_message(request,messages.ERROR,(
          #      "I really hope you are sure to delete"
         #   ))
        #return True
        
userAdmin_site = UserAdminArea(name="UserAdmin")

userAdmin_site.register(User,TestAdminPermissions)


# @admin.register(Author, Reader, Editor, site=custom_admin_site)
# class PersonAdmin(admin.ModelAdmin):
#     pass


admin.site.register(User)
admin.site.register(Permission)
admin.site.register(Role)