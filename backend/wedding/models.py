from django.db import models

class Message(models.Model):
	full_name = models.CharField(max_length=255)
	message   = models.CharField(max_length=300)
	created_at = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
	full_name = models.CharField(max_length=255)
	image     = models.ImageField(upload_to='avatars/', null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

class Video(models.Model):
	full_name = models.CharField(max_length=255)
	video     = models.FileField(upload_to='videos/',   null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
