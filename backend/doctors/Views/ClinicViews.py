from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from doctors.models import Clinic
from doctors.serializers import ClinicSerializer, ClinicSerializerDetails


class ListCreateClinicView(ListCreateAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer
    page_size = 100

    def get_queryset(self):
        """
        The function "get_queryset" returns a filtered queryset of Trip objects based on the provided max_budget
        parameter in the request query parameters. It filters the queryset to include only Trip objects whose
        budget field is less than or equal to the provided max_budget value.
        """
        queryset = Clinic.objects.all().order_by("-id")
        min_beds = self.request.query_params.get('min_beds')

        if min_beds is not None:
            queryset = queryset.filter(beds__gte=min_beds)

        return queryset


class RetrieveUpdateDestroyClinicView(RetrieveUpdateDestroyAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializerDetails