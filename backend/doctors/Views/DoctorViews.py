from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from doctors.models import Doctor
from doctors.serializers import DoctorSerializer, DoctorSerializerDetails


class ListCreateDoctorView(ListCreateAPIView):
    queryset = Doctor.objects.all().order_by("-id")
    serializer_class = DoctorSerializer
    page_size = 100


class RetrieveUpdateDestroyDoctorView(RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializerDetails