# views.py
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import render
from rest_framework.exceptions import ValidationError

# API Views
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        price = serializer.validated_data.get('price')
        stock = serializer.validated_data.get('stock')

        if price <= 0:
            raise ValidationError({"price": "El precio debe ser mayor a 0."})
        if stock < 0:
            raise ValidationError({"stock": "El stock no puede ser negativo."})

        serializer.save()

class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Plantilla de productos

def products(request):
    return render(request, 'products.html')
