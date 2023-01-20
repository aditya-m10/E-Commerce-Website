from django.urls import path
from api.views import product_views as views


urlpatterns = [
    path('',views.getProducts,name="products"),

    path('create/',views.createProduct,name="create_product"),
    path('category/',views.categoryProduct,name="category products"),
    path('myproduct/',views.myProduct,name="my product"),
]