from django.urls import path

from doctors.Views.BloodBagViews import ListCreateBloodBagView, RetrieveUpdateDestroyBloodBagView, BloodBagCount
from doctors.Views.ClinicViews import ListCreateClinicView, RetrieveUpdateDestroyClinicView, ClinicAutoCompleteView, \
    ClinicCount
from doctors.Views.DoctorViews import ListCreateDoctorView, RetrieveUpdateDestroyDoctorView, DoctorCount, \
    DoctorAutoCompleteView
from doctors.Views.DoctorsDonorsViews import ListCreateDonorsofDoctorView, ListCreateDoctorsDonorsView, \
    RetrieveUpdateDestroyDoctorsDonorsView
from doctors.Views.DonorViews import ListCreateDonorView, RetrieveUpdateDestroyDonorView, DonorCount, \
    DonorAutoCompleteView
from doctors.Views.Reports import ClinicReport, DoctorBloodBagReport, DonorReport
from doctors.Views.Utils import schema_view, MyTokenObtainView, RegisterView, ConfirmView, UserDetailsView, \
    ListUsersView, UpdateUserView
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('doctors/', ListCreateDoctorView.as_view()),
    path('doctors/<int:pk>', RetrieveUpdateDestroyDoctorView.as_view()),
    path('doctors/<int:doctor>/donors', ListCreateDonorsofDoctorView.as_view()),
    path('doctors/count', DoctorCount.as_view()),
    path('doctors/autocomplete', DoctorAutoCompleteView.as_view()),
    path('clinics/', ListCreateClinicView.as_view()),
    path('clinics/autocomplete', ClinicAutoCompleteView.as_view()),
    path('clinics/nr-doctors-report', ClinicReport.as_view()),
    path('clinics/<int:pk>', RetrieveUpdateDestroyClinicView.as_view()),
    path('clinics/count', ClinicCount.as_view()),
    path('clinics/<int:clinic_id>/doctor-bloodbag-report/', DoctorBloodBagReport.as_view()),
    path('donors/', ListCreateDonorView.as_view()),
    path('donors/<int:pk>', RetrieveUpdateDestroyDonorView.as_view()),
    path('donors/report', DonorReport.as_view()),
    path('donors/count', DonorCount.as_view()),
    path('donors/autocomplete', DonorAutoCompleteView.as_view()),
    path('bloodbags/', ListCreateBloodBagView.as_view()),
    path('bloodbags/<int:pk>', RetrieveUpdateDestroyBloodBagView.as_view()),
    path('bloodbags/count', BloodBagCount.as_view()),
    path('doctorsdonors/', ListCreateDoctorsDonorsView.as_view()),
    path('doctorsdonors/<int:pk>', RetrieveUpdateDestroyDoctorsDonorsView.as_view()),
    path('docs', schema_view.with_ui('swagger', cache_timeout=0)),
    path('api/token/', MyTokenObtainView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view()),
    path('api/register/confirm/<int:code>/', ConfirmView.as_view()),
    path('api/userdetails/<int:id>/', UserDetailsView.as_view()),

    path('users/', ListUsersView.as_view(), name="list_users_view"),
    path('users/<int:pk>/', UpdateUserView.as_view(), name="update_user_view"),
]
