from rest_framework import serializers
from .models import Image, Video, Message

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['full_name', 'image']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['full_name', 'video']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['full_name', 'message']

