import datetime

from django.test import TestCase

from doctors.models import Clinic, Doctor, Donor, DoctorsDonors, BloodBag
from doctors.views import DoctorBloodBagReport, ClinicReport


# Create your tests here.

class ClinicsQueryTest(TestCase):
    def setUp(self):
        Clinic.objects.create(name="clinic1", description="-", address='somewhere', beds=12, nrRooms=30)
        Doctor.objects.create(name='doc1', hospital_id=1)
        Doctor.objects.create(name='doc2', hospital_id=1)
        Donor.objects.create(name='donor1', email='alma@alma.com', birthday='2000-05-05')
        Donor.objects.create(name='donor2', email='alma@alma.com', birthday='2000-05-05')
        doc1 = Doctor.objects.get(name='doc1')
        self.assertEqual(len(doc1.donors.all()), 0)
        DoctorsDonors.objects.create(doctor_id=1, donor_id=1)
        doc1 = Doctor.objects.get(name='doc1')
        self.assertEqual(len(doc1.donors.all()), 1)

    def test_get(self):
        q = ClinicReport()
        response_data = q.get(None).data
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0]['nr_doctors'], 2)

        Clinic.objects.create(name="clinic2", description="-", address='somewhere', beds=12, nrRooms=30)

        q = ClinicReport()
        response_data = q.get(None).data
        self.assertEqual(len(response_data), 2)
        self.assertEqual(response_data[0]['nr_doctors'], 2)
        self.assertEqual(response_data[1]['nr_doctors'], 0)

        Doctor.objects.create(name='doc2', hospital_id=2)

        q = ClinicReport()
        response_data = q.get(None).data
        self.assertEqual(len(response_data), 2)
        self.assertEqual(response_data[0]['nr_doctors'], 2)
        self.assertEqual(response_data[1]['nr_doctors'], 1)


class DoctorsQueryTest(TestCase):
    def setUp(self):
        Clinic.objects.create(name="clinic1", description="-", address='somewhere', beds=12, nrRooms=30)
        Doctor.objects.create(name='doc1', hospital_id=1)
        Doctor.objects.create(name='doc2', hospital_id=1)

        Donor.objects.create(name='donor1', email='alma@alma.com', birthday='2000-05-05')
        Donor.objects.create(name='donor2', email='alma@alma.com', birthday='2000-05-05')

        DoctorsDonors.objects.create(doctor_id=1, donor_id=1)
        DoctorsDonors.objects.create(doctor_id=1, donor_id=2)
        DoctorsDonors.objects.create(doctor_id=2, donor_id=1)

    def test_get(self):
        BloodBag.objects.create(source_id=1)

        BloodBag.objects.create(source_id=3, quantity=200)
        q = ClinicReport()
        response_data = q.get(None).data
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0]['nr_doctors'], 2)

        Clinic.objects.create(name="clinic2", description="-", address='somewhere', beds=12, nrRooms=30)

        q = DoctorBloodBagReport()
        response_data = q.get(None, clinic_id=1).data
        self.assertEqual(len(response_data), 2)
        self.assertEqual(response_data[0]['avg_collected_blood'], 450)
        self.assertEqual(response_data[1]['avg_collected_blood'], 200)

        BloodBag.objects.create(source_id=2, quantity=350)

        q = DoctorBloodBagReport()
        response_data = q.get(None, clinic_id=1).data
        self.assertEqual(len(response_data), 2)
        self.assertEqual(response_data[0]['avg_collected_blood'], 400)
        self.assertEqual(response_data[1]['avg_collected_blood'], 200)

