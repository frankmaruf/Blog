from django.urls import path,include
from .views import users,register
urlpatterns = [
    path('users',users),
    path('register',register)
]