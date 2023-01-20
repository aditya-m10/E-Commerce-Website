# Django Import
import json
# Rest Framework Import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
import razorpay
# Local Import
from api.models import *
from api.serializers import OrderSerializer
import os


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createOrder(request):
    try:
        user = request.user
        data = Product.objects.create(
            user=user,
            Products=request.data["Products"],
            order_id=request.data["order_id"],
            totalPrice=request.data["totalPrice"],
            shipping_Address=request.data["shipping_Address"],
            )
        OrderSerializer(data=data)
        
        return Response({"msg":"Ordered"})
    except:
        return Response({"error":"Error , please try again"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order(request ):
    user = request.user
    order = Order.objects.filter(user=user)
    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)




@api_view(['POST'])
def createOrder(request):
    global client
    data = request.data

    amount = int(float(data['amount']))

    client = razorpay.Client(auth=(os.environ['RAZOR_PAY_PUBLIC_KEY'], os.environ['RAZOR_PAY_SECRET_KEY']))

    data = {"amount" : amount, "currency" : "INR"}
    payment = client.order.create(data=data)

    return Response({'order_id': payment['id'], 'amount': payment['amount'], 'currency':payment['currency']})

@api_view(['POST'])
def verifySignature(request):
    res = request.data

    params_dict = {
        'razorpay_payment_id' : res['razorpay_paymentId'],
        'razorpay_order_id' : res['razorpay_orderId'],
        'razorpay_signature' : res['razorpay_signature']
    }

    # verifying the signature
    res = client.utility.verify_payment_signature(params_dict)
    if res == True:
        return Response({'status':'Payment Successful'})
    return Response({'status':'Payment Failed'})
