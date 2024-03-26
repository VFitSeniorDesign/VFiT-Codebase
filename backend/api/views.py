from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from base.models import User, HumanModel
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse
from django.conf import settings
import subprocess
import os


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
    username = request.user.username
    print(username)
    print(data)
    
    #get blender and script paths
    blender_executable_path = '/Applications/Blender.app/Contents/MacOS/Blender'  # Or the full path if 'blender' is not in PATH
    cwd = os.getcwd()
    script_path = os.path.join(cwd, "..", "BlenderFiles", "humanGen.py")
    print(script_path)
    output_directory = os.path.join(settings.MEDIA_ROOT, "savedModels", username+".glb")
    print("output_dir: ", output_directory)

    # Construct the command to run Blender in the background with your script
    command = [
        blender_executable_path,
        # '--background',  # Run in background without UI
        '--python', script_path,
        '--',
        # Separator between Blender args and script args
        # Add additional arguments passed to your script here
        str(data.get('age', '')),
        str(data.get('height', '')),
        str(data.get('muscularity', '')),
        str(data.get('skinny', '')),
        str(data.get('overweight', '')),
        str(data.get('skinColor', '')),
        str(username),
        str(output_directory)
    ]
    
    try:
        # Execute the Blender script
        #print('here')
        #save model path to HumanModel based on user
        #generated_model_path = os.path.join(cwd, "savedModels",  username + ".glb")
        print("generated path: ",output_directory)
        relative_model_path = os.path.join("savedModels", f"{username}.glb")
        human_model, created = HumanModel.objects.get_or_create(user=request.user)
        print("human_model:", human_model)
        print("created:", created)

        # Update the model_path field with the generated model path
        human_model.model_path = relative_model_path
        human_model.save()


        result = subprocess.run(command, check=True, capture_output=True, text=True)
        output = result.stdout  # Capture the output from the script
        print("Success")
        return JsonResponse({"response": "Script executed successfully!", "output": output})
    except subprocess.CalledProcessError as e:
        # Handle errors in script execution
        error_output = e.stderr
        print("Failed")
        return JsonResponse({"response": "Error executing script", "error": error_output}, status=500)


@api_view(['HEAD', 'GET'])
#@permission_classes([IsAuthenticated])
def fetch_model(request):
    try:
        # Attempt to fetch the HumanModel instance associated with the current user
        human_model = HumanModel.objects.get(user=request.user)
        # Check if a model_path exists
        if human_model.model_path:
            # Return the model_path if it exists
            return Response({'model_path': human_model.model_path})
        else:
            # Return a message indicating the model_path is not available
            return Response({'message': 'No model path exists for the current user.'})
    except HumanModel.DoesNotExist:
        # Return a response indicating no HumanModel instance exists for the current user
        return Response({'message': 'No model information found for the current user.'}, status=404)