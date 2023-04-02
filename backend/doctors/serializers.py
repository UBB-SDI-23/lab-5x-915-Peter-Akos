from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from doctors.models import Doctor, Clinic, Donor, BloodBag, DoctorsDonors
from rest_framework.exceptions import ValidationError


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


class DoctorSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Doctor
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Doctor.objects.all(),
                fields=['name', 'title', 'hospital']
            )
        ]


class ClinicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Clinic.objects.all(),
                fields=['name', 'address']
            )
        ]


class DoctorSerializerDetails(serializers.ModelSerializer):
    hospital = ClinicSerializer(required=False, read_only=True)

    class Meta:
        model = Doctor
        fields = ['name', 'title', 'salary', 'hospital', 'university_gpa', 'donors']
        read_only_fields = ['hospital']

    def update(self, instance, validated_data):
        data = self.context["request"].data
        # print(data)
        # print(validated_data)
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


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = "__all__"
        validators = [
            UniqueTogetherValidator(
                queryset=Clinic.objects.all(),
                fields=['name', 'birthday']
            )
        ]


class BloodBagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodBag
        fields = "__all__"


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
