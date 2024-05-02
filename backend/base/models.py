from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class  User(AbstractUser):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length =  150, unique=True)
    username = models.CharField(max_length = 15, unique = True)

class HumanModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='human_model')
    model_file = models.FileField(upload_to='human_models/')

    def __str__(self):
        return f"HumanModel for {self.user.username}"