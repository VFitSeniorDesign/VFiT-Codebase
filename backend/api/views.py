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
import cv2
from api.face import process_image
import tempfile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile




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
    # Extract non-file data from request.POST
    age = request.POST.get('age')
    height = request.POST.get('height')
    muscularity = request.POST.get('muscularity')
    skinny = request.POST.get('skinny')
    overweight = request.POST.get('overweight')
    chosenClothSelection = request.POST.get('chosenClothSelection')
    chosenPreset = request.POST.get('chosenPreset')
    gender = request.POST.get('chosenGender')

    # Extract file data from request.FILES
    uploaded_file = request.FILES.get('file')
    
    # Save the uploaded file to a temporary location
    if uploaded_file:
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        for chunk in uploaded_file.chunks():
            temp_file.write(chunk)
        temp_file.close()
        file_path = temp_file.name
    else:
        return JsonResponse({"response": "File upload failed"}, status=400)

    try:
        # Process the file using OpenCV
        results = process_image(cv2.imread(file_path))
        print("RESULTS:", results)

        # Continue with your current logic for running the Blender script
        blender_executable_path = '/Applications/Blender.app/Contents/MacOS/Blender'
        cwd = os.getcwd()
        script_path = os.path.join(cwd, "..", "BlenderFiles", "humanGen.py")
        
        output_directory = os.path.join(settings.MEDIA_ROOT, "savedModels", request.user.username)
        if os.path.exists(output_directory):
            shutil.rmtree(output_directory)
        os.makedirs(output_directory)

        command = [
            blender_executable_path,
            '--python', script_path,
            '--',
            str(age), #0
            str(height), #1
            str(muscularity), #2
            str(skinny), #3
            str(overweight), #4
            str(chosenClothSelection), #5
            str(chosenPreset), #6
            str(request.user.username), #7
            str(output_directory), #8
            str(results.get("Eye Distance", -1)), #9
            str(results.get("Eye Width", -1)), #10
            str(results.get("Eye Height", -1)), #11
            str(results.get("Nose Width", -1)), #12
            str(results.get("Nose Height", -1)), #13
            str(results.get("Lip Width", -1)), #14
            str(results.get("Chin Width", -1)), #15
            str(results.get("Chin Height", -1)), #16
            str(results.get("Jaw Width", -1)), #17
            str(gender) #18
            
        ]

        relative_dir = os.path.join("savedModels", request.user.username)
        human_model, created = HumanModel.objects.get_or_create(user=request.user)
        human_model.model_path = relative_dir
        human_model.save()

        result = subprocess.run(command, check=True)#, capture_output=True, text=True)
        #output = result.stdout
        #print(output)
        print("Success")
        return JsonResponse({"response": "Script executed successfully!"})
    except subprocess.CalledProcessError as e:
        error_output = e.stderr
        print("Failed")
        return JsonResponse({"response": "Error executing script", "error": error_output}, status=500)
    finally:
        # Clean up the temporary file
        os.remove(file_path)


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
    
