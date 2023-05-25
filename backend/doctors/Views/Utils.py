import random
import re
from django.utils import timezone

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from doctors.models import User, UserDetail, Clinic, Doctor, Donor, BloodBag
from doctors.serializers import MyTokenObtainPairSerializer, UserDetailSerializer, UserSerializer
from rest_framework.response import Response
from doctors.permissions import IsAdmin

schema_view = get_schema_view(
    openapi.Info(
        title="BloodClinic API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


class MyTokenObtainView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(APIView):
    def post(self, request, *args, **kwags):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not re.search("^[a-zA-Z0-9]*$", username):
            return Response({"Error": "Elbasztad a usert"})
        if not re.search("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", email):
            return Response({"Error": "Elbasztad az emailt"})
        if not re.search("[a-z]", password) or not re.search("[A-Z]", password) or not re.search("[0-9]",
                                                                                                 password) or not re.search(
            "[\.,\$\+]", password) or len(password) < 8:
            return Response({"Error": "Elbasztad a jelszot"})

        random.seed(timezone.now().timestamp())

        code = str(random.randint(a=10000, b=99999))
        time = timezone.now()
        max_key = User.objects.all().order_by('-id')[0].id
        user = User(id=max_key+1, username=username)
        user.set_password(password)
        user.email = email

        user.confirmation_start = time
        user.confirmation_code = code

        user.is_active = False
        user.save()

        UserDetail.objects.create(id=max_key+1, userName=user, bio=request.data.get('bio'), location=request.data.get('location'),
                                  birthday=request.data.get('day'),
                                  gender=request.data.get('gender'), marital=request.data.get('marital'))

        return Response({"code": code})


class ConfirmView(APIView):
    def get(self, request, code, *args, **kwags):
        try:
            user = User.objects.get(confirmation_code=code)
        except:
            return Response({"detail": "No user found"})
        if user is None:
            return Response({"detail": "No user found"})

        currentTime = timezone.now()
        if (currentTime - user.confirmation_start).total_seconds() / 60 >= 10:
            userDetail = UserDetail.objects.get(userName=user)
            userDetail.delete()
            user.delete()
            return Response({"detail": "Time is up"})

        user.confirmation_code = None
        user.confirmation_start = None
        user.is_active = True
        user.save()

        return Response({"detail": "User activated successfully"})


class UserDetailsView(APIView):
    def get(self, request, id, *args, **kwags):
        res = UserDetailSerializer(UserDetail.objects.get(userName=id)).data
        numberOfClinics = len(Clinic.objects.filter(createdBy_id=id))
        numberOfDoctors = len(Doctor.objects.filter(createdBy_id=id))
        numberOfDonors = len(Donor.objects.filter(createdBy_id=id))
        numberOfBloodBags = len(BloodBag.objects.filter(createdBy_id=id))
        username = User.objects.get(id=id).username
        res['numberOfClinics'] = numberOfClinics
        res['numberOfDoctors'] = numberOfDoctors
        res['numberOfDonors'] = numberOfDonors
        res['numberOfBloodBags'] = numberOfBloodBags
        res['userName'] = username
        return Response(res)


class ListUsersView(ListAPIView):
    permission_classes = [IsAdmin]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    def get_queryset(self):
        queryset = User.objects.all().order_by('id')

        page_size = self.request.query_params.get('page_size')
        page_number = self.request.query_params.get('page_number')

        if page_size is None:
            page_size = 20
        else:
            page_size = int(page_size)

        if page_number is None:
            page_number = 0
        else:
            page_number = int(page_number)

        ret_from = page_number * page_size
        ret_to = page_size * (page_number + 1)

        return queryset[ret_from:ret_to]



class UpdateUserView(UpdateAPIView):
    permission_classes = [IsAdmin]
    serializer_class = UserSerializer
    queryset = User.objects.all()
