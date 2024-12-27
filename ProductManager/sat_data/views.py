import requests
import pandas as pd
from django.http import JsonResponse
from .models import SatData

# URL del archivo de "Cancelados"
SAT_FILE_URL = "http://omawww.sat.gob.mx/cifras_sat/Documents/Cancelados.csv"

def download_sat_file(request):
    try:
        # Descargar el archivo desde la URL
        response = requests.get(SAT_FILE_URL)
        response.raise_for_status()  # Verifica que la descarga fue exitosa

        # Guardar el archivo como CSV
        with open("cancelados.csv", "wb") as file:
            file.write(response.content)

        # Procesar el archivo CSV
        df = pd.read_csv("cancelados.csv", encoding="latin1")  # Asegúrate de usar la codificación correcta

        # Iterar sobre las filas del archivo y guardarlas en la base de datos
        for _, row in df.iterrows():
            SatData.objects.create(
                rfc=row.get("RFC"),
                nombre=row.get("Nombre", ""),
                estatus=row.get("Estatus", "Cancelado"),
            )

        return JsonResponse({"message": "Archivo descargado y procesado correctamente."}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
