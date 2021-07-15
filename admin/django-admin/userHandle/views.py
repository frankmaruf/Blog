from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import exceptions,generics, serializers
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework import viewsets,status,mixins
from blogAdmin.pagination import CustomPagination
from .models import Permission, Role, User
from .serializers import UserSerializer,PermissionSerializer,RoleSerializer
from .authentication import JWTAuthentication, generate_assess_token
from rest_framework.permissions import IsAuthenticated
from .permissions import ViewPermissions
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
        data = UserSerializer(request.user).data
        data['permissions'] = [p['name'] for p in data['role']['permissions']]
        return Response({
            'data': data
        })

class PermissionAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated ]
    def get(self,request):
        serializer = PermissionSerializer(Permission.objects.all(),many = True)
        return Response({
            'data': serializer.data
        })

class RoleViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated ]
    permission_object = 'roles'

    def list(self, request):
        serializer = RoleSerializer(Role.objects.all(), many=True)

        return Response({
            'data': serializer.data
        })

    def create(self,request):
        serializer = RoleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data':serializer.data
        },status=status.HTTP_201_CREATED)


    def retrieve(self,request,pk=None):
        role = Role.objects.get(id=pk)
        serializer = RoleSerializer(role)
        return Response({
            "data": serializer.data
        })
    def update(self,request,pk=None):
        role = Role.objects.get(id=pk)
        serializer = RoleSerializer(instance=role,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        },status=status.HTTP_202_ACCEPTED)

    def destroy(self,request,pk=None):
        role = Role.objects.get(id=pk)
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserGenericAPIView(generics.GenericAPIView,mixins.ListModelMixin,
mixins.RetrieveModelMixin,mixins.CreateModelMixin,
mixins.UpdateModelMixin,mixins.DestroyModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    permission_object = 'users'
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = CustomPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['^username', '^email','^first_name','^last_name','=id']

    def get(self,request,pk=None):
        if pk:
            return Response({
                'data':self.retrieve(request,pk).data
            })
        return self.list(request)
    def post(self,request):
        request.data.update({
            'password':1234,
            'role':request.data['role_id']
        })
        return Response({
            'data': self.create(request).data
        })
    def put(self,request,pk=None):
        if request.data['role_id']:
            request.data.update({
            'role':request.data['role_id']
        })
        return Response({
            'data': self.partial_update(request,pk).data
        })
    def delete(self, request, pk=None):
        return self.destroy(request, pk)


class ProfileInfoAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def put(self,request,pk=None):
        user = request.user
        serializer = UserSerializer(user,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
class ProfilePasswordAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def put(self,request,pk=None):
        user = request.user
        if (request.data['password'] != request.data['password_confirm']):
            raise exceptions.ValidationError("Password or Old Password don't match")
        serializer = UserSerializer(user,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
@api_view(['POST'])
def logout(_):
    response = Response()
    response.delete_cookie(key="jwt")
    response.data = {
        'message' : 'Success'
    }
    return response
