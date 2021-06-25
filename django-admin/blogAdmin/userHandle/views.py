from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import exceptions, serializers
from .models import User
from .serializers import UserSerializer
# Create your views here.

@api_view(['POST'])
def register(request):
    data = request.data
    if data['password'] != data['password_confirm']:
        raise exceptions.APIException('Password do not match!')
    serializers = UserSerializer(data = data)
    serializers.is_valid(raise_exception=True)
    serializers.save()
    return Response(serializers.data)

@api_view(['GET'])
def users(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)