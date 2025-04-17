from rest_framework import serializers
from .models import Image, Video, Message

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['full_name', 'image', 'created_at']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['full_name', 'video', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['full_name', 'message', 'created_at']

