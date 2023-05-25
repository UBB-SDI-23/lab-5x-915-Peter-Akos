from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView

from doctors.models import Clinic
from doctors.serializers import ClinicSerializer, ClinicSerializerDetails, ClinicSerializerAutoComplete
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from doctors.permissions import IsAdmin, IsModerator, IsRegular


class ListCreateClinicView(ListCreateAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer

    def get_permissions(self):
        permissions_list = []
        if self.request.method == 'POST':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        return [permission() for permission in permissions_list]

    def get_queryset(self):
        queryset = Clinic.objects.all().order_by("-id")
        min_beds = self.request.query_params.get('min_beds')

        page_size = self.request.query_params.get('page_size')
        page_number = self.request.query_params.get('page_number')

        if page_size is None:
            page_size = 100
        else:
            page_size = int(page_size)

        if min_beds is None:
            min_beds = 0
        else:
            min_beds = int(min_beds)

        if page_number is None:
            page_number = 0
        else:
            page_number = int(page_number)

        if min_beds is not None:
            queryset = queryset.filter(beds__gte=min_beds)

        ret_from = page_number * page_size
        ret_to = page_size * (page_number + 1)

        return queryset[ret_from:ret_to]


class RetrieveUpdateDestroyClinicView(RetrieveUpdateDestroyAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializerDetails

    def get_permissions(self):
        permissions_list = []
        if self.request.method == 'PUT':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        if self.request.method == 'DELETE':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsModerator)
        return [permission() for permission in permissions_list]


class ClinicAutoCompleteView(ListCreateAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializerAutoComplete

    def get_queryset(self):
        query_string = self.request.query_params.get('query')
        queryset = Clinic.objects.all().filter(name__startswith=query_string)
        return queryset[:20]


class ClinicCount(APIView):
    def get(self, request):
        count = Clinic.objects.all().count()
        print(count)
        return Response({'count': count})
