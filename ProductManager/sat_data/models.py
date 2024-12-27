from django.db import models

class SatData(models.Model):
    rfc = models.CharField(max_length=13)
    nombre = models.CharField(max_length=255)
    estatus = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.rfc} - {self.nombre} - {self.estatus}"
