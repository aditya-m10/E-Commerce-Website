# Django Import
import json
# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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



@api_view(['GET'])
def categoryProduct(request ):
    category=request.data["category"]
    products = Product.objects.filter(category=category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myProduct(request ):
    user=request.user
    products = Product.objects.filter(user=user)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)





