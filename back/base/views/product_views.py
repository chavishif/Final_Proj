from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.models import Product
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.views import APIView
from base.serializers import productSerializer


# class ProductView(APIView):
#     def get(self, request):
#         my_model = Product.objects.all()
#         serializer = productSerializer(my_model, many=True)
#         return Response(serializer.data)

class ProductView(APIView):
    def get(self, request):
        my_model = Product.objects.all()
        serializer = productSerializer(my_model, many=True)
        return Response(serializer.data)





# review from glasses project

# @api_view(['POST', ])
# @permission_classes([IsAuthenticated])
# def createProductReview(request, pk):

#     product = Product.objects.get(_id=pk)
#     user = request.user
#     data = request.data

#     """
#     Case 1: Customer already written a review
#     Case 2: Rating is not entered
#     Case 3: Create the review
#     """

#     alreadyExist = product.review_set.filter(user=user).exists()

#     if alreadyExist:
#         content = {'detail':"Product Already Reviewed"}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)

#     elif data['rating'] == 0:
#         content = {'detail':"Please Select Rating"}
#         return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
#     else:
#         review = Review.objects.create(
#             user = user,
#             product = product,
#             name = user.username,
#             rating = data['rating'],
#             comment = data['comment'],
#         )
        
#         reviews = product.review_set.all()
#         product.numReviews = len(reviews)

#         total = 0
#         for review in reviews:
#             total+=review.rating

#         product.rating = total / len(reviews)

#         product.save()

#     return Response("Review added successfully")
    # return Response({'detail':"Review added successfully"})