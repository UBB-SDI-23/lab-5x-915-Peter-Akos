from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from doctors.models import Doctor, Clinic, Donor, BloodBag, DoctorsDonors, User, UserDetail
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import re


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class UserNameIdSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id']


class UserDetailSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = UserDetail
        fields = '__all__'


class UserSerializer(DynamicFieldsModelSerializer):
    # paginationValue = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['username', 'id', 'role']
        read_only_fields = ['username']


class DoctorSerializerAggregated(DynamicFieldsModelSerializer):
    total_donors = serializers.IntegerField(required=False)
    createdBy = UserNameIdSerializer()

    class Meta:
        model = Doctor
        fields = ['id', 'name', 'title', 'salary', 'university_gpa', 'hospital', 'total_donors', 'createdBy']
        depth = 0

    def validate(self, data):
        if type(data["salary"]) is not int or data["salary"] < 0:
            raise serializers.ValidationError({"error": "Doctor salary must be a positive integer"})
        if type(data["university_gpa"]) is not float or data["university_gpa"] < 0:
            raise serializers.ValidationError({"error": "Doctor university GPA must be a positive integer"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["name"]):
            raise serializers.ValidationError({"error": "Name can only contain numbers and letters"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["title"]):
            raise serializers.ValidationError({"error": "Title can only contain numbers and letters"})
        return data

    def create(self, validated_data):
        user_data = validated_data.pop('createdBy')
        doctor = Doctor.objects.create(**validated_data)
        doctor.createdBy_id = user_data['username']
        doctor.save()
        return doctor


class DoctorSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'title', 'salary', 'university_gpa', 'hospital']
        validators = [
            UniqueTogetherValidator(
                queryset=Doctor.objects.all(),
                fields=['name', 'title', 'hospital']
            )
        ]

    def validate(self, data):
        if type(data["salary"]) is not int or data["salary"] < 0:
            raise serializers.ValidationError({"error": "Doctor salary must be a positive integer"})
        if type(data["university_gpa"]) is not int or data["university_gpa"] < 0:
            raise serializers.ValidationError({"error": "Doctor university GPA must be a positive integer"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["name"]):
            raise serializers.ValidationError({"error": "Name can only contain numbers and letters"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["title"]):
            raise serializers.ValidationError({"error": "Title can only contain numbers and letters"})
        return data


class ClinicSerializer(serializers.ModelSerializer):
    createdBy = UserNameIdSerializer()

    class Meta:
        model = Clinic
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Clinic.objects.all(),
                fields=['name', 'address']
            )
        ]

    def validate(self, data):
        if type(data["beds"]) is not int or data["beds"] < 0:
            raise serializers.ValidationError({"error": "Doctor salary must be a positive integer"})
        if type(data["nrRooms"]) is not int or data["nrRooms"] < 0:
            raise serializers.ValidationError({"error": "Doctor university GPA must be a positive integer"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["name"]):
            raise serializers.ValidationError({"error": "Name can only contain numbers and letters"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["address"]):
            raise serializers.ValidationError({"error": "Title can only contain numbers and letters"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["description"]):
            raise serializers.ValidationError({"error": "Title can only contain numbers and letters"})
        return data

    def create(self, validated_data):
        user_data = validated_data.pop('createdBy')
        clinic = Clinic.objects.create(**validated_data)
        clinic.createdBy_id = user_data['username']
        clinic.save()
        return clinic


class DoctorSerializerDetails(serializers.ModelSerializer):
    hospital = ClinicSerializer(required=False, read_only=True)

    class Meta:
        model = Doctor
        fields = ['name', 'title', 'salary', 'hospital', 'university_gpa', 'donors']
        read_only_fields = ['hospital']
        depth = 1

    def validate(self, data):
        if type(data["salary"]) is not int or data["salary"] < 0:
            raise serializers.ValidationError({"error": "Doctor salary must be a positive integer"})
        if type(data["university_gpa"]) is not float or data["university_gpa"] < 0:
            raise serializers.ValidationError({"error": "Doctor university GPA must be a positive integer"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["name"]):
            raise serializers.ValidationError({"error": "Name can only contain numbers and letters"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["title"]):
            raise serializers.ValidationError({"error": "Title can only contain numbers and letters"})
        return data

    def update(self, instance, validated_data):
        data = self.context["request"].data
        if "hospital" in data.keys():
            hospital_field = data['hospital']
            if type(hospital_field) == int:
                try:
                    obj = Clinic.objects.get(pk=hospital_field)
                    instance.hospital = obj
                    instance.save()
                except Exception:
                    raise ValidationError("Invalid hospital id")

        super().update(instance=instance, validated_data=validated_data)
        return instance


class ClinicSerializerDetails(serializers.ModelSerializer):
    doctors = DoctorSerializer(fields=('name', 'title', 'salary', 'university_gpa'), source='doctors_set', many=True,
                               read_only=True)

    class Meta:
        model = Clinic
        depth = 1
        fields = ('name', 'description', 'address', 'beds', 'nrRooms', 'doctors')

    def validate(self, data):
        if type(data["beds"]) is not int or data["beds"] < 0:
            raise serializers.ValidationError({"error": "Doctor salary must be a positive integer"})
        if type(data["nrRooms"]) is not int or data["nrRooms"] < 0:
            raise serializers.ValidationError({"error": "Doctor university GPA must be a positive integer"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["name"]):
            raise serializers.ValidationError({"error": "Name can only contain numbers and letters"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["address"]):
            raise serializers.ValidationError({"error": "Title can only contain numbers and letters"})
        if not re.search("^[a-zA-Z0-9 ]*$", data["description"]):
            raise serializers.ValidationError({"error": "Title can only contain numbers and letters"})
        return data


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Donor.objects.all(),
                fields=['name', 'birthday']
            )
        ]
        depth = 1

    def validate(self, data):
        if not re.search("^[a-zA-Z0-9 ]*$", data["name"]):
            raise serializers.ValidationError({"error": "Name can only contain numbers and letters"})
        if not re.search("^[0-9 ]*$", data["phone"]):
            raise serializers.ValidationError({"error": "Phone can only contain numbers and letters"})
        if not re.search("^[a-zA-Z ]*$", data["citizenship"]):
            raise serializers.ValidationError({"error": "Citizenship can only contain letters"})
        return data


class DonorSerializerAggregated(serializers.ModelSerializer):
    nr_doctors = serializers.IntegerField(required=False)
    createdBy = UserNameIdSerializer()

    class Meta:
        model = Donor
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Donor.objects.all(),
                fields=['name', 'birthday']
            )
        ]

    def validate(self, data):
        if not re.search("^[a-zA-Z0-9 ]*$", data["name"]):
            raise serializers.ValidationError({"error": "Name can only contain numbers and letters"})
        if not re.search("^[0-9 ]*$", data["phone"]):
            raise serializers.ValidationError({"error": "Phone can only contain numbers and letters"})
        if not re.search("^[a-zA-Z ]*$", data["citizenship"]):
            raise serializers.ValidationError({"error": "Citizenship can only contain letters"})
        return data

    def create(self, validated_data):
        user_data = validated_data.pop('createdBy')
        print(user_data)
        donor = Donor.objects.create(**validated_data)
        donor.createdBy_id = user_data['username']
        donor.save()
        return donor


class BloodBagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodBag
        fields = "__all__"

    def validate(self, data):
        if type(data["donor"]) is not int or data["donor"] < 0:
            raise serializers.ValidationError({"error": "Donor must be a positive integer"})
        if type(data["doctor"]) is not int or data["doctor"] < 0:
            raise serializers.ValidationError({"error": "Doctor must be a positive integer"})
        return data


class DoctorNameIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name']


class DonorNameIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ['id', 'name']


class DoctorsDonorTestSerializer(serializers.ModelSerializer):
    donor = DonorNameIdSerializer()
    doctor = DoctorNameIdSerializer()

    class Meta:
        model = DoctorsDonors
        fields = ['doctor', 'donor', 'id']


class BloodBagSerializerDetails(serializers.ModelSerializer):
    source = DoctorsDonorTestSerializer()
    createdBy = UserNameIdSerializer()

    class Meta:
        model = BloodBag
        fields = "__all__"
        depth = 2

    def create(self, validated_data):
        donor_id = validated_data['source']['donor']['name']
        doctor_id = validated_data['source']['doctor']['name']
        createdBy_id = validated_data.pop('createdBy')['username']
        try:
            lookup = DoctorsDonors.objects.get(donor_id=donor_id, doctor_id=doctor_id)
        except:
            print("does not exit")
            lookup = DoctorsDonors(doctor_id=doctor_id, donor_id=donor_id, createdBy_id=createdBy_id)
            lookup.save()
        res = BloodBag(source_id=lookup.id, quantity=validated_data['quantity'], date=validated_data['date'],
                       createdBy_id=createdBy_id)
        res.save()
        return res

    def update(self, instance, validated_data):
        print(validated_data)
        print(instance)

        donor_id = validated_data['source']['donor']['name']
        doctor_id = validated_data['source']['doctor']['name']

        try:
            lookup = DoctorsDonors.objects.get(donor_id=donor_id, doctor_id=doctor_id)
        except:
            print("does not exit")
            lookup = DoctorsDonors(doctor_id=doctor_id, donor_id=donor_id)
            lookup.save()

        instance.source_id = lookup.id
        instance.date = validated_data['date']
        instance.quantity = validated_data['quantity']
        instance.save()
        return instance


class DonorsOfDoctorSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        doctor_id = self.context.get('request').parser_context.get('kwargs').get(
            'doctor')
        dr = Doctor.objects.get(pk=doctor_id)
        o = DoctorsDonors(doctor_id=doctor_id, donor=validated_data['donor'])
        o.save()
        return o

    class Meta:
        model = DoctorsDonors
        fields = ['donor']
        write_only_fields = ['id', 'doctor']


class DoctorsDonorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorsDonors
        fields = "__all__"


class DoctorSerializerReport(DynamicFieldsModelSerializer):
    avg_collected_blood = serializers.IntegerField(
        source='avg_bloodbags',
        read_only=True
    )

    class Meta:
        model = Doctor
        fields = "__all__"


class ClinicSerializerReport(DynamicFieldsModelSerializer):
    nr_doctors = serializers.IntegerField(
        read_only=True
    )

    class Meta:
        model = Clinic
        fields = "__all__"


class DonorSerializerReport(DynamicFieldsModelSerializer):
    nr_other_donors_assisted_by_its_doctors = serializers.IntegerField(read_only=True)

    class Meta:
        model = Donor
        fields = "__all__"


class ClinicSerializerAutoComplete(DynamicFieldsModelSerializer):
    class Meta:
        model = Clinic
        fields = ['name', 'id']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['user_id'] = user.id
        token['role'] = user.role

        return token
