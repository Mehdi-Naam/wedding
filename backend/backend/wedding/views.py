from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Wedding
import os
import mimetypes

@api_view(['POST'])
def upload_media(request):
    user = Wedding.objects.first()  # adjust this to find the right user

    uploaded_file = request.FILES.get('file')

    if not uploaded_file:
        return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

    mime_type, _ = mimetypes.guess_type(uploaded_file.name)

    if mime_type is None:
        return Response({'error': 'Unsupported file type'}, status=status.HTTP_400_BAD_REQUEST)

    file_ext = os.path.splitext(uploaded_file.name)[1]

    if mime_type.startswith('image'):
        filename = f"{user.full_name}_avatar{file_ext}"
        user.avatar.save(filename, uploaded_file, save=True)
    elif mime_type.startswith('video'):
        filename = f"{user.full_name}_video{file_ext}"
        user.video.save(filename, uploaded_file, save=True)
    else:
        return Response({'error': 'Only image and video files are supported.'}, status=status.HTTP_400_BAD_REQUEST)

    user.save()
    return Response({'message': 'Media uploaded successfully'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def image(request):
	user_data = Wedding.objects.get()

	if user_data:
		return Response({'user_id': user_data['id'], 'full_name': user_data['full_name'], 'avatar': user_data.get('avatar')})
	return Response({'error': 'No valid token found'}, status=401)

@api_view(['GET'])
def message(request):
	user_data = Wedding.objects.get()

	if user_data:
		return Response({'user_id': user_data['id'], 'full_name': user_data['full_name'], 'message': user_data.get('message')})
	return Response({'error': 'No valid token found'}, status=401)
