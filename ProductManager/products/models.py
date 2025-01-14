# models.py
from django.db import models
from django.core.exceptions import ValidationError

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    category = models.ForeignKey('categories.Category', on_delete=models.CASCADE)

    def clean(self):
        if self.price <= 0:
            raise ValidationError("El precio debe ser mayor a 0.")
        if self.stock < 0:
            raise ValidationError("El stock no puede ser negativo.")