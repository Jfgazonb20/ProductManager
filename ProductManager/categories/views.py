from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer
from django.shortcuts import render

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

def categories(request):
    return render(request, 'categories.html')
