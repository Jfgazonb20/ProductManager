from django.urls import path
from .views import ProductListCreateView, ProductRetrieveUpdateDestroyView

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list-create'),  # Listar y crear productos
    path('<int:pk>/', ProductRetrieveUpdateDestroyView.as_view(), name='product-detail'),  # Detalle, actualizar y eliminar
]
