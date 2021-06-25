from django.contrib.auth.models import AbstractUser
from django.db import models


class Permission(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self) -> str:
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=200)
    permissions= models.ManyToManyField(Permission)
    def __str__(self) -> str:
        return self.name

class User(AbstractUser):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    email = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    role = models.ForeignKey(Role,on_delete=models.SET_NULL,null=True)
    username = models.CharField(max_length=200, unique=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['date_of_birth','email']
    def __str__(self):
        return str(self.username)