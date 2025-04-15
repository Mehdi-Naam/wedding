
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/ping_usermanagement/', include("ping_usermanagement.urls")),
] + static(f"api" + settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
