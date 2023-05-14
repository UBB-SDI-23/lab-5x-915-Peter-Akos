from django.db.models import Count
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView

from doctors.models import Doctor
from doctors.serializers import DoctorSerializer, DoctorSerializerDetails, DoctorSerializerAggregated
from rest_framework.response import Response


class ListCreateDoctorView(ListCreateAPIView):
    queryset = Doctor.objects.all().order_by("-id")
    serializer_class = DoctorSerializerAggregated

    def get_queryset(self):
        queryset = Doctor.objects.annotate(
            total_donors=Count('donors')
        ).order_by("-id")
        min_beds = self.request.query_params.get('min_beds')

        page_size = self.request.query_params.get('page_size')
        page_number = self.request.query_params.get('page_number')

        if page_size is None:
            page_size = 100
        else:
            page_size = int(page_size)

        if page_number is None:
            page_number = 0
        else:
            page_number = int(page_number)

        if min_beds is not None:
            queryset = queryset.filter(beds__gte=min_beds)

        ret_from = page_number * page_size
        ret_to = page_size * (page_number + 1)

        return queryset[ret_from:ret_to]


class RetrieveUpdateDestroyDoctorView(RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializerDetails


class DoctorCount(APIView):
    def get(self, request):
        count = Doctor.objects.all().count()
        print(count)
        return Response({'count':count})