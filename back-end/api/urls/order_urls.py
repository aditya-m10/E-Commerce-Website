from django.urls import path
from api.views import order_view as views


urlpatterns = [
    path('',views.order,name="order"),
    path('placeorder/',views.createOrder,name="createorder"),
    path('createOrder/', views.createOrder),
    path('verifySignature/', views.verifySignature),
]