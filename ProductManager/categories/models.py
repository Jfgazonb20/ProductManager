from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['name']  # Ordenará por el campo "name" alfabéticamente

    def __str__(self):
        return self.name
