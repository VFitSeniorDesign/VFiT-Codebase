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
import shutil


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
    #output_directory = os.path.join(settings.MEDIA_ROOT, "savedModels", username+".glb")
    #print("output_dir: ", output_directory)
    output_directory = os.path.join(settings.MEDIA_ROOT, "savedModels", username)
    if os.path.exists(output_directory):
        shutil.rmtree(output_directory)  
    os.makedirs(output_directory) 

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
        str(data.get('clothSelection', '')),
        str(data.get('preset', '')),
        str(username),
        str(output_directory)
    ]
    
    try:
        relative_dir = os.path.join("savedModels", username)
        print("RELATIVE DIR: ", relative_dir)
        human_model, created = HumanModel.objects.get_or_create(user=request.user)
        print("human_model:", human_model)
        print("created:", created)

        # Update the model_path field with the generated model path
        human_model.model_path = relative_dir
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
    data = request.data
    username = request.user.username
    print("GET API USERNAME: ", username)

    try:
        human_model = HumanModel.objects.get(user=request.user)
        if human_model.model_path:
            finalpath = os.path.join(human_model.model_path, username + ".glb")
            
            user_folder = os.path.join(settings.MEDIA_ROOT, f'savedModels/{username}/')
            files = os.listdir(user_folder)
            # Filter files to include only those that start with the username
            filtered_files = [file for file in files if file.startswith(username)]
            #print("FILTERED FILES: ", filtered_files)
            file_urls = [request.build_absolute_uri(f'/media/savedModels/{username}/{file}') for file in filtered_files]
            print("FILE URLS: ", file_urls)
            return JsonResponse({'files': file_urls})
            
            #print("GET API FINALPATH: ", finalpath)
            #return Response({'model_path': finalpath})
        else:
            return Response({'message': 'No model path exists for the current user.'})
    except HumanModel.DoesNotExist:
        return Response({'message': 'No model information found for the current user.'}, status=404)
    
