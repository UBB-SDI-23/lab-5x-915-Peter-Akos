from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from doctors.models import DoctorsDonors
from doctors.serializers import DonorsOfDoctorSerializer, DoctorsDonorsSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from doctors.permissions import IsAdmin, IsModerator, IsRegular


class ListCreateDonorsofDoctorView(ListCreateAPIView):
    queryset = DoctorsDonors.objects.all().order_by('-id')
    serializer_class = DonorsOfDoctorSerializer

    def get_permissions(self):
        permissions_list = []
        if self.request.method == 'POST':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        return [permission() for permission in permissions_list]

    def get_queryset(self, *args, **kwargs):
        return self.queryset.filter(doctor=self.kwargs.get('doctor'))

    def create(self, request, doctor=None, company_pk=None, project_pk=None):
        is_many = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ListCreateDoctorsDonorsView(ListCreateAPIView):
    queryset = DoctorsDonors.objects.all()
    serializer_class = DoctorsDonorsSerializer

    def get_permissions(self):
        permissions_list = []
        if self.request.method == 'POST':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        return [permission() for permission in permissions_list]


class RetrieveUpdateDestroyDoctorsDonorsView(RetrieveUpdateDestroyAPIView):
    queryset = DoctorsDonors.objects.all()
    serializer_class = DoctorsDonorsSerializer

    def get_permissions(self):
        permissions_list = []
        if self.request.method == 'PUT':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsRegular)
        if self.request.method == 'DELETE':
            permissions_list.append(IsAuthenticated)
            permissions_list.append(IsModerator)
        return [permission() for permission in permissions_list]