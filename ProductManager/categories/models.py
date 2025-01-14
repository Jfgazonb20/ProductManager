from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    encargado = models.CharField(max_length=200, blank=True, default="Sin encargado")  # Campo para encargado

    class Meta:
        ordering = ['name']  # Ordena las categorías alfabéticamente por nombre

    def __str__(self):
        return self.name
