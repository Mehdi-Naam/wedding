from django.db import models

# Create your models here.
class Wedding(models.Model):
	full_name = models.CharField(max_length=255)
	image     = models.ImageField(upload_to='avatars/', null=True, blank=True)
	video     = models.FileField(upload_to='videos/',   null=True, blank=True)
	message   = models.CharField(max_length=300)
	# created_at = models.DateTimeField(auto_now_add=True)
