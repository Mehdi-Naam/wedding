from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Message, Video, Image
from .serializers import MessageSerializer, VideoSerializer, ImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class DataView(APIView):
	parser_classes = [MultiPartParser, FormParser]

	def get(self, request):
		messages = MessageSerializer(Message.objects.all(), many=True).data
		images   = ImageSerializer(Image.objects.all(), many=True).data
		videos   = VideoSerializer(Video.objects.all(), many=True).data

		return Response({
			'messages': messages,
			'images': images,
			'videos': videos,
		}, status=status.HTTP_200_OK)

	def post(self, request):

		# print(request.data)

		full_name = request.data.get('full_name')
		message_text = request.data.get('message')
		image = request.FILES.get('image')
		video = request.FILES.get('video')

		message_instance = None
		if message_text:
			msg_serializer = MessageSerializer(data={'full_name': full_name, 'message': message_text})
			if msg_serializer.is_valid():
				message_instance = msg_serializer.save()
			else:
				return Response({'error': msg_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

		if image:
			img_serializer = ImageSerializer(data={'full_name': full_name, 'image': image})
			if img_serializer.is_valid():
				img_serializer.save()
			else:
				return Response({'error': img_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

		if video:
			vid_serializer = VideoSerializer(data={'full_name': full_name, 'video': video})
			if vid_serializer.is_valid():
				vid_serializer.save()
			else:
				return Response({'error': vid_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

		return Response({'message': 'Data saved successfully ✅'}, status=status.HTTP_201_CREATED)
