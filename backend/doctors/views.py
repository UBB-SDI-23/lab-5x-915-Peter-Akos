from django.db.models import Avg, Count
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from doctors.models import Doctor, Clinic, Donor, BloodBag, DoctorsDonors
from doctors.serializers import DoctorSerializer, ClinicSerializer, DonorSerializer, ClinicSerializerDetails, \
    DoctorSerializerDetails, DonorsOfDoctorSerializer, BloodBagSerializer, DoctorSerializerReport, \
    ClinicSerializerReport, DonorSerializerReport, DoctorsDonorsSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
# Create your views here.


class ListCreateDoctorView(ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer


class RetrieveUpdateDestroyDoctorView(RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializerDetails


class ListCreateClinicView(ListCreateAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer

    def get_queryset(self):
        """
        The function "get_queryset" returns a filtered queryset of Trip objects based on the provided max_budget
        parameter in the request query parameters. It filters the queryset to include only Trip objects whose
        budget field is less than or equal to the provided max_budget value.
        """
        queryset = Clinic.objects.all()
        min_beds = self.request.query_params.get('min_beds')

        if min_beds is not None:
            queryset = queryset.filter(beds__gte=min_beds)

        return queryset


class RetrieveUpdateDestroyClinicView(RetrieveUpdateDestroyAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializerDetails


class ListCreateDonorView(ListCreateAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer


class RetrieveUpdateDestroyDonorView(RetrieveUpdateDestroyAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer


class ListCreateDonorsofDoctorView(ListCreateAPIView):
    queryset = DoctorsDonors.objects.all()
    serializer_class = DonorsOfDoctorSerializer

    def get_queryset(self, *args, **kwargs):
        return self.queryset.filter(doctor=self.kwargs.get('doctor'))

    def create(self, request, doctor=None, company_pk=None, project_pk=None):
        is_many = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ListCreateBloodBagView(ListCreateAPIView):
    queryset = BloodBag.objects.all()
    serializer_class = BloodBagSerializer


class RetrieveUpdateDestroyBloodBagView(RetrieveUpdateDestroyAPIView):
    queryset = BloodBag.objects.all()
    serializer_class = BloodBagSerializer


class DoctorBloodBagReport(APIView):
    def get(self, request, clinic_id):
        doctors = Doctor.objects.filter(hospital_id=clinic_id)
        doctor_avg_bloodbags = doctors.annotate(avg_bloodbags=Avg('doctorsdonors__bloodbag__quantity')).order_by('-avg_bloodbags')
        serializer = DoctorSerializerReport(doctor_avg_bloodbags, fields=['name', 'avg_collected_blood'], many=True)

        return Response(serializer.data)


class ClinicReport(APIView):

    def get(self, request):
        clinics = Clinic.objects.all()
        clinics_nr_doctors = clinics.annotate(nr_doctors=Count('doctors_set')).order_by('-nr_doctors')
        serializer = ClinicSerializerReport(clinics_nr_doctors, fields=['nr_doctors', 'name'], many=True)
        return Response(serializer.data)


class DonorReport(APIView):

    def get(self, request):
        donors = Donor.objects.all()
        donors_nr_doctors = donors.annotate(nr_other_donors_assisted_by_its_doctors=Count('doctors__donors')).order_by('-nr_other_donors_assisted_by_its_doctors')
        serializer = DonorSerializerReport(donors_nr_doctors, many=True)
        return Response(serializer.data)


class ListCreateDoctorsDonorsView(ListCreateAPIView):
    queryset = DoctorsDonors.objects.all()
    serializer_class = DoctorsDonorsSerializer


class RetrieveUpdateDestroyDoctorsDonorsView(RetrieveUpdateDestroyAPIView):
    queryset = DoctorsDonors.objects.all()
    serializer_class = DoctorsDonorsSerializer


