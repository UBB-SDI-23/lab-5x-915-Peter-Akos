from django.db.models import Count, Q
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView

from doctors.models import Doctor, User
from doctors.serializers import DoctorSerializer, DoctorSerializerDetails, DoctorSerializerAggregated, \
    DoctorNameIdSerializer
from rest_framework.response import Response
from doctors.permissions import IsAdmin, IsModerator, IsRegular
from rest_framework.permissions import IsAuthenticated


class ListCreateDoctorView(ListCreateAPIView):
    queryset = Doctor.objects.all().order_by("-id")
    serializer_class = DoctorSerializerAggregated

    def get_permissions(self):
        permissions_list = []
        if self.request.method == 'POST':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        return [permission() for permission in permissions_list]

    def get_queryset(self):
        queryset = Doctor.objects.annotate(
            total_donors=Count('donors')
        ).order_by("-id")
        min_beds = self.request.query_params.get('min_beds')

        page_size = self.request.query_params.get('page_size')
        page_number = self.request.query_params.get('page_number')

        if page_size is None:
            page_size = 20
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

    def get_permissions(self):
        permissions_list = []
        if self.request.method == 'PUT':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        if self.request.method == 'DELETE':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        return [permission() for permission in permissions_list]


class DoctorCount(APIView):
    def get(self, request):
        count = Doctor.objects.all().count()
        print(count)
        return Response({'count': count})


class DoctorAutoCompleteView(ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorNameIdSerializer

    def get_queryset(self):
        query_string = self.request.query_params.get('query')
        queryset = Doctor.objects.all().filter(name__startswith=query_string)
        return queryset[:20]
