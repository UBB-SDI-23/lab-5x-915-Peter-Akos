import datetime

from django.db import models

# Create your models here.


class Clinic(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    address = models.CharField(max_length=50)
    beds = models.IntegerField()
    nrRooms = models.IntegerField()

    def __str__(self):
        return self.name


class Doctor(models.Model):
    name = models.CharField(max_length=50, default="Missing name")
    title = models.CharField(max_length=30, default="Missing Title")
    salary = models.IntegerField(default=0)
    hospital = models.ForeignKey(to=Clinic, on_delete=models.PROTECT, related_name='doctors_set')
    university_gpa = models.FloatField(default=0)
    donors = models.ManyToManyField(to='Donor', through='DoctorsDonors', related_name='donors_set')

    def __str__(self):
        return self.name


class Donor(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15, default="Missing phone")
    email = models.EmailField()
    birthday = models.DateField()
    citizenship = models.CharField(max_length=25)
    doctors = models.ManyToManyField(to="Doctor", through="DoctorsDonors")

    def __str__(self):
        return self.name


class DoctorsDonors(models.Model):
    donor = models.ForeignKey(to=Donor, on_delete=models.CASCADE)
    doctor = models.ForeignKey(to=Doctor, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('donor', 'doctor')

    def __str__(self):
        return "Donor: " + str(self.donor) + ", Doctor: " + str(self.doctor)


class BloodBag(models.Model):
    source = models.ForeignKey(to=DoctorsDonors, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=450)
    date = models.DateField(default=datetime.date.today, blank=True)






