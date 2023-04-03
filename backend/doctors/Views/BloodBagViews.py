from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from doctors.models import BloodBag
from doctors.serializers import BloodBagSerializer


class ListCreateBloodBagView(ListCreateAPIView):
    queryset = BloodBag.objects.all()
    serializer_class = BloodBagSerializer


class RetrieveUpdateDestroyBloodBagView(RetrieveUpdateDestroyAPIView):
    queryset = BloodBag.objects.all()
    serializer_class = BloodBagSerializer
