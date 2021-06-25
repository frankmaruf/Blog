from django.urls import path,include
from .views import users,register,login,logout,AuthenticatedUser
urlpatterns = [
    path('users',users),
    path('register',register),
    path('login',login),
    path('user',AuthenticatedUser.as_view()),
    path('logout',logout)
]