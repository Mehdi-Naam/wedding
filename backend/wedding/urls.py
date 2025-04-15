
from . import views
from django.urls import path

urlpatterns = [
    path('data' , views.DataView.as_view()),
]
