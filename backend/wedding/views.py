from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Wedding
import os
import mimetypes
from .serializers import WeddingSerializer

from rest_framework.parsers import MultiPartParser, FormParser

def upload_media(uploaded_file, wedding):

    # serializer = WeddingSerializer(data=data)
    # if not serializer.is_valid():
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # wedding = serializer.save()

    mime_type, _ = mimetypes.guess_type(uploaded_file.name)

    if mime_type is None:
        return Response({'error': 'Unsupported file type'}, status=status.HTTP_400_BAD_REQUEST)

    file_ext = os.path.splitext(uploaded_file.name)[1]

    if mime_type.startswith('image'):
        filename = f"{wedding.full_name}_avatar{file_ext}"
        wedding.avatar.save(filename, uploaded_file, save=True)
    elif mime_type.startswith('video'):
        filename = f"{wedding.full_name}_video{file_ext}"
        wedding.video.save(filename, uploaded_file, save=True)
    else:
        return Response({'error': 'Only image and video files are supported.'}, status=status.HTTP_400_BAD_REQUEST)

    wedding.save()

    return Response({'message': 'Wedding data and media uploaded successfully', 'data': wedding.data}, status=status.HTTP_201_CREATED)


class DataView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        try:
            user_data = Wedding.objects.all()
            data      = WeddingSerializer(user_data, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        except Wedding.DoesNotExist:
            return Response({'error': 'No valid token found'}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        try:
            data_ = WeddingSerializer(data=request.data)

            # Optional: custom media handling
            image = request.FILES.get('image', None)
            video = request.FILES.get('video', None)

            if image or video:
                print("📸🎥 Media detected")
                upload_media(image, data_ )
                # upload_media(video, data_ )

            if data_.is_valid():
                data_.save()
                return Response(data_.data, status=status.HTTP_201_CREATED)

            print("❌ Validation failed:", data_.errors)
            return Response({'error': data_.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("🔥 Server error:", str(e))
            return Response({'error': 'Server error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)