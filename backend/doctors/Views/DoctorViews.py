from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from doctors.models import Doctor
from doctors.serializers import DoctorSerializer, DoctorSerializerDetails


class ListCreateDoctorView(ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer


class RetrieveUpdateDestroyDoctorView(RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializerDetails