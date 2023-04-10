from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from doctors.models import Donor
from doctors.serializers import DonorSerializer


class ListCreateDonorView(ListCreateAPIView):
    queryset = Donor.objects.all().order_by('-id')
    serializer_class = DonorSerializer
    page_size = 100


class RetrieveUpdateDestroyDonorView(RetrieveUpdateDestroyAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer