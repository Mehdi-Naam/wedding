from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Message, Video, Image
from .serializers import MessageSerializer, VideoSerializer, ImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class DataView(APIView):
	parser_classes = [MultiPartParser, FormParser]

	def get(self, request):
		messages = [
			{
				"message": msg["message"],
				"full_name": msg["full_name"]
			}
			for msg in MessageSerializer(Message.objects.all(), many=True).data
		]

		images = [
			{
				"image": img["image"],
				"full_name": img["full_name"]
			}
			for img in ImageSerializer(Image.objects.all(), many=True).data
		]

		videos = [
			{
				"video": vid["video"],
				"full_name": vid["full_name"]
			}
			for vid in VideoSerializer(Video.objects.all(), many=True).data
		]

		combined_data = messages + images + videos
		return Response(combined_data)

	def post(self, request):

		full_name    = request.data.get('full_name')
		message_text = request.data.get('message')
		image        = request.FILES.get('image')
		video        = request.FILES.get('video')

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
