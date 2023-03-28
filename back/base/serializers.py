from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import ShippingAddress, Order, OrderItem ,Product


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        return token
 
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



# class productSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'


class productSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    subcategory = serializers.CharField(source='subcategory.name')
    subimage = serializers.ImageField(source='subcategory.subimage.image')
    proimage = serializers.ImageField(source='proimage.image')

    class Meta:
        model = Product
        fields = [ 'id',
                  'name',
                    'desc',
                    'size_spec',
                     'price',
                     'quantity',
                     'count_in_stock',
                     'category',
                     'subcategory',
                     'subimage', 
                     'proimage']

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = MyTokenObtainPairSerializer(user, many=False)
        return serializer.data
