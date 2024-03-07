from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from base.models import User 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse
import subprocess


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
    #run blender script below and generate data
    # return Response({"response": "All good, data recieved!"})
    # Define the path to Blender and your script
    blender_executable_path = '/Applications/Blender.app/Contents/MacOS/Blender'  # Or the full path if 'blender' is not in PATH
    script_path = '/Users/aryamangupta/Spring_24/VFiT-Codebase/BlenderFiles/humanGen.py'
    
    # Construct the command to run Blender in the background with your script
    command = [
        blender_executable_path,
        # '--background',  # Run in background without UI
        '--python', script_path,
        # Separator between Blender args and script args
        # Add additional arguments passed to your script here
        # str(data.get('param1', '')),  # Example: Convert parameters to strings
        # str(data.get('param2', ''))
        # Add more parameters as needed
    ]

    try:
        # Execute the Blender script
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        output = result.stdout  # Capture the output from the script
        return JsonResponse({"response": "Script executed successfully!", "output": output})
    except subprocess.CalledProcessError as e:
        # Handle errors in script execution
        error_output = e.stderr
        return JsonResponse({"response": "Error executing script", "error": error_output}, status=500)