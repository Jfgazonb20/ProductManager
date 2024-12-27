from django.shortcuts import render

def home(request):
    return render(request, 'home.html')  # Tu página de inicio personalizada

def products(request):
    return render(request, 'products.html')  # Página de gestión de productos

def categories(request):
    return render(request, 'categories.html')  # Página de gestión de categorías
