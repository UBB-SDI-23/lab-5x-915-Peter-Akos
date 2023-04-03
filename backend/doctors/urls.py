from django.urls import path

from doctors.Views.BloodBagViews import ListCreateBloodBagView, RetrieveUpdateDestroyBloodBagView
from doctors.Views.ClinicViews import ListCreateClinicView, RetrieveUpdateDestroyClinicView
from doctors.Views.DoctorViews import ListCreateDoctorView, RetrieveUpdateDestroyDoctorView
from doctors.Views.DoctorsDonorsViews import ListCreateDonorsofDoctorView, ListCreateDoctorsDonorsView, \
    RetrieveUpdateDestroyDoctorsDonorsView
from doctors.Views.DonorViews import ListCreateDonorView, RetrieveUpdateDestroyDonorView
from doctors.Views.Reports import ClinicReport, DoctorBloodBagReport, DonorReport
from doctors.Views.Utils import schema_view

urlpatterns = [
    path('doctors/', ListCreateDoctorView.as_view()),
    path('doctors/<int:pk>', RetrieveUpdateDestroyDoctorView.as_view()),
    path('doctors/<int:doctor>/donors', ListCreateDonorsofDoctorView.as_view()),
    path('clinics/', ListCreateClinicView.as_view()),
    path('clinics/nr-doctors-report', ClinicReport.as_view()),
    path('clinics/<int:pk>', RetrieveUpdateDestroyClinicView.as_view()),
    path('clinics/<int:clinic_id>/doctor-bloodbag-report/', DoctorBloodBagReport.as_view()),
    path('donors/', ListCreateDonorView.as_view()),
    path('donors/<int:pk>/', RetrieveUpdateDestroyDonorView.as_view()),
    path('donors/report', DonorReport.as_view()),
    path('bloodbags/', ListCreateBloodBagView.as_view()),
    path('bloodbags/<int:pk>', RetrieveUpdateDestroyBloodBagView.as_view()),
    path('doctorsdonors/', ListCreateDoctorsDonorsView.as_view()),
    path('doctorsdonors/<int:pk>', RetrieveUpdateDestroyDoctorsDonorsView.as_view()),
    path('docs', schema_view.with_ui('swagger', cache_timeout=0)),
]
