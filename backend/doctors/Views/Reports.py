from django.db.models import Count, Avg
from rest_framework.views import APIView

from doctors.models import Doctor, Clinic, Donor
from doctors.serializers import DoctorSerializerReport, ClinicSerializerReport, DonorSerializerReport
from rest_framework.response import Response


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