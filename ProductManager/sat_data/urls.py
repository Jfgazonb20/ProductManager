# urls.py en 'sat_data'
from django.urls import path
from .views import download_sat_file

urlpatterns = [
     path("download/", download_sat_file, name="download_sat_file"),
]
