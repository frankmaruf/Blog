from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import exceptions, serializers
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer
from .authentication import JWTAuthentication, generate_assess_token
from rest_framework.permissions import IsAuthenticated
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

@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = User.objects.filter(username=username).first()

    if user is None:
        raise exceptions.AuthenticationFailed("User not found!")
    if not user.check_password(password):
        raise exceptions.AuthenticationFailed('Incorrect Password')
    
    response = Response()
    token = generate_assess_token(user)
    response.set_cookie(key='jwt',value=token,httponly=True,samesite='Strict')
    response.data = {
        "jwt":token
    }

    return response

class AuthenticatedUser(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response({
            'data': serializer.data
        })

@api_view(['POST'])
def logout(_):
    response = Response()
    response.delete_cookie(key="jwt")
    response.data = {
        'message' : 'Success'
    }
    return response

@api_view(['GET'])
def users(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)