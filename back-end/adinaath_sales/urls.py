
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/',include('api.urls.user_urls')),
    path('api/product/',include('api.urls.product_urls')),
    path('api/order/',include('api.urls.order_urls')),


    #path('', include('api.urls')),


]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
