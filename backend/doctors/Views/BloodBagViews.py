from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView

from doctors.models import BloodBag
from doctors.serializers import BloodBagSerializer, BloodBagSerializerDetails
from rest_framework.response import Response


class ListCreateBloodBagView(ListCreateAPIView):
    queryset = BloodBag.objects.all()
    serializer_class = BloodBagSerializerDetails

    def get_queryset(self):
        queryset = BloodBag.objects.all().order_by("-id")
        page_size = self.request.query_params.get('page_size')
        page_number = self.request.query_params.get('page_number')

        if page_size is None:
            page_size = 25
        else:
            page_size = int(page_size)

        if page_number is None:
            page_number = 0
        else:
            page_number = int(page_number)

        ret_from = page_number * page_size
        ret_to = page_size * (page_number + 1)

        return queryset[ret_from:ret_to]


class RetrieveUpdateDestroyBloodBagView(RetrieveUpdateDestroyAPIView):
    queryset = BloodBag.objects.all()
    serializer_class = BloodBagSerializerDetails


class BloodBagCount(APIView):
    def get(self, request):
        count = BloodBag.objects.all().count()
        print(count)
        return Response({'count':count})
