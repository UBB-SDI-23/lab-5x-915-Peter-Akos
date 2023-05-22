import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.

class User(AbstractUser):
    class Role(models.TextChoices):
        REGULAR = "Regular", 'Regular'
        MODERATOR = "Moderator", 'Moderator'
        Admin = "Admin", 'Admin'

    role = models.CharField(max_length=30, choices=Role.choices, default='Regular')
    confirmation_code = models.CharField(max_length=20, blank=True, null=True, unique=True)
    confirmation_start = models.DateTimeField(blank=True, null=True)


class UserDetail(models.Model):
    genderChoices = [
        ('M', 'Male'),
        ('F', 'Female')
    ]
    maritalChoices = [
        ('M', 'Married'),
        ('R', 'Relationship'),
        ('S', 'Single')
    ]

    userName = models.ForeignKey(User, related_name="user", on_delete=models.CASCADE, null=True)
    bio = models.CharField(max_length=200, null=True)
    location = models.CharField(max_length=100, null=True)
    birthday = models.DateField(null=True)
    gender = models.CharField(max_length=2, choices=genderChoices, null=True)
    marital = models.CharField(max_length=2, choices=maritalChoices, null=True)
    paginationValue = models.IntegerField(default=25)


class Clinic(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    address = models.CharField(max_length=50)
    beds = models.IntegerField()
    nrRooms = models.IntegerField()
    createdBy = models.ForeignKey(to=User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    name = models.CharField(max_length=50, default="Missing name")
    title = models.CharField(max_length=30, default="Missing Title")
    salary = models.IntegerField(default=0)
    hospital = models.ForeignKey(to=Clinic, on_delete=models.PROTECT, related_name='doctors_set')
    university_gpa = models.FloatField(default=0)
    donors = models.ManyToManyField(to='Donor', through='DoctorsDonors', related_name='donors_set')
    createdBy = models.ForeignKey(to=User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Donor(models.Model):
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15, default="Missing phone")
    email = models.EmailField()
    birthday = models.DateField()
    citizenship = models.CharField(max_length=25)
    description = models.CharField(max_length=500, default="Missing name")
    doctors = models.ManyToManyField(to="Doctor", through="DoctorsDonors")
    createdBy = models.ForeignKey(to=User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class DoctorsDonors(models.Model):
    donor = models.ForeignKey(to=Donor, on_delete=models.CASCADE)
    doctor = models.ForeignKey(to=Doctor, on_delete=models.CASCADE)
    createdBy = models.ForeignKey(to=User, null=True, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('donor', 'doctor')

    def __str__(self):
        return "Donor: " + str(self.donor) + ", Doctor: " + str(self.doctor)


class BloodBag(models.Model):
    source = models.ForeignKey(to=DoctorsDonors, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=450)
    date = models.DateField(default=datetime.date.today)
    createdBy = models.ForeignKey(to=User, null=True, on_delete=models.CASCADE)
