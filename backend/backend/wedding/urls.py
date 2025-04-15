
from . import views
from django.urls import path

urlpatterns = [
    path('avatar/', views.image),
    path('image_video/', views.avatar),
    path('message/', views.message),
]
