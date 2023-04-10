from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from doctors.models import BloodBag
from doctors.serializers import BloodBagSerializer


class ListCreateBloodBagView(ListCreateAPIView):
    queryset = BloodBag.objects.all().order_by('id')
    serializer_class = BloodBagSerializer
    page_size = 100


class RetrieveUpdateDestroyBloodBagView(RetrieveUpdateDestroyAPIView):
    queryset = BloodBag.objects.all()
    serializer_class = BloodBagSerializer
