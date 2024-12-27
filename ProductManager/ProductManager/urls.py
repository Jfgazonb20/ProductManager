from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render

# Funciones para renderizar las plantillas
def home_view(request):
    return render(request, 'home.html')

def products_view(request):
    return render(request, 'products.html')

def categories_view(request):
    return render(request, 'categories.html')

urlpatterns = [
    path('', home_view, name='home'),  # Página de inicio
    path('products/', products_view, name='products'),  # Página de productos
    path('categories/', categories_view, name='categories'),  # Página de categorías
    path('api/products/', include('products.urls')),  # API de productos
    path('api/categories/', include('categories.urls')),  # API de categorías
    path("sat-data/", include("sat_data.urls")),  # SAT Data
    path('admin/', admin.site.urls),  # Administración
]
