from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.shortcuts import render

# API Views
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Plantilla de productos
def products(request):
    return render(request, 'products.html')
