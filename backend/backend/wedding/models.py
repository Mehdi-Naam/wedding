from django.db import models

# Create your models here.
class Wedding(AbstractBaseUser, PermissionsMixin):

	message    = models.CharField(max_length=30, default="message")
	full_name  = models.CharField(max_length=30, default="full_name")
	video      = models.FileField(upload_to='videos/', null=True, blank=True)
	avatar     = models.ImageField(upload_to='avatars/', default='avatars/default.jpg')
