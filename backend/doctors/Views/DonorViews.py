from django.db.models import Count
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView

from doctors.models import Donor
from doctors.permissions import IsAdmin, IsModerator, IsRegular
from doctors.serializers import DonorSerializer, DonorSerializerAggregated, DonorNameIdSerializer
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated


class ListCreateDonorView(ListCreateAPIView):
    queryset = Donor.objects.all().order_by('-id')
    serializer_class = DonorSerializerAggregated

    def get_permissions(self):
        permissions_list = []
        if self.request.method == 'POST':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        return [permission() for permission in permissions_list]

    def get_queryset(self):
        queryset = Donor.objects.annotate(
            nr_doctors=Count('doctors')
        ).order_by("-id")
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

        ret_from = page_number * page_size
        ret_to = page_size * (page_number + 1)

        return queryset[ret_from:ret_to]


class RetrieveUpdateDestroyDonorView(RetrieveUpdateDestroyAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer

    def get_permissions(self):
        permissions_list = []
        if self.request.method == 'PUT':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        if self.request.method == 'DELETE':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        return [permission() for permission in permissions_list]


class DonorAutoCompleteView(ListCreateAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorNameIdSerializer

    def get_queryset(self):
        query_string = self.request.query_params.get('query')
        queryset = Donor.objects.all().filter(name__startswith=query_string)
        return queryset[:20]


class DonorCount(APIView):
    def get(self, request):
        count = Donor.objects.all().count()
        print(count)
        return Response({'count': count})
