from rest_framework import serializers
from .models import Wedding

class WeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wedding
        fields = ['message', 'full_name', 'image', 'video']
        # fields = ['message', 'full_name', 'image', 'video', 'created_at']

