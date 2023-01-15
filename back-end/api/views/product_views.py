# Django Import
from django.shortcuts import render
import json

from rest_framework import status


# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes,renderer_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from base64 import b64encode

# Local Import
from api.models import *
from api.serializers import ProductSerializer

@api_view(['GET'])
def getProducts(request):

    product = Product.objects.all()
    serilizer = ProductSerializer(product, many=True)
    return Response(serilizer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduct(request):
    try:
        user = request.user
        data = Product.objects.create(
            user=user,
            image=request.data["image"],
            product_name=request.data["product_name"],
            price=request.data["price"],
            brand=request.data["brand"],
            countInStock=request.data["countInStock"],
            category=request.data["category"],
            description=request.data["description"]
            )
        ProductSerializer(data=data)
        
        return Response({"msg":"data added"})
    except:
        return Response({"error":"Error while adding, please try again"})







# Create a new Product
# @api_view(['POST'])
# @permission_classes([IsAdminUser])
# def createProduct(request):

#     user = request.user
#     product = Product.objects.create(
#         user=user,
#         name=" Product Name ",
#         price=0,
#         brand="Sample brand ",
#         countInStock=0,
#         category="Sample category",
#         description=" "
#     )

#     serializer = ProductSerializer(product, many=False)
#     return Response(serializer.data)





