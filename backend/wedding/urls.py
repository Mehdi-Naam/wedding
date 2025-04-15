
from . import views
from django.urls import path

urlpatterns = [
    path('video', views.video),
    path('image', views.image),
    path('message' , views.MessageView.as_view()),
]
