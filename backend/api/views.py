from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from base.models import User 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register_user(request):
    user_data = request.data
    user_data['password'] = make_password(user_data['password'])  # Hash the password
    user = User.objects.create(**user_data)
    return Response({'message': 'User created successfully', 'user': {'username': user.username}}, status=201)

#to receive data from frontend
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_model(request):
    data = request.data
    print(data)
    return Response({"response": "All good, data recieved!"})