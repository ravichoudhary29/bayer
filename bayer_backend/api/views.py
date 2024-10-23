import logging
from rest_framework import status, throttling
from rest_framework.exceptions import ValidationError, APIException, NotFound
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions, pagination
from .models import Appointment, Doctor, Slot, Patient
from .serializers import AppointmentSerializer, DoctorSerializer, SlotSerializer, PatientSerializer
from datetime import datetime

# Set up logging
logger = logging.getLogger(__name__)

class AppointmentPagination(pagination.PageNumberPagination):
    page_size = 10  # You can adjust this number
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    pagination_class = AppointmentPagination
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    @action(detail=False, methods=['post'])
    def create_appointment(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                appointment = serializer.save()
                logger.info(f"Appointment created: {appointment.id}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error creating appointment: {str(e)}")
                return error_response("Failed to create appointment.", status.HTTP_400_BAD_REQUEST)
        logger.warning(f"Invalid data: {serializer.errors}")
        raise ValidationError(serializer.errors)

class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error fetching doctors: {str(e)}")
            raise APIException("Failed to fetch doctors")
    
    @action(detail=True, methods=['get'], url_path='appointments')
    def doctors_appointments(self, request, pk=None):
        try:
            doctor = self.get_object()  # Get the specific doctor instance
            appointments = Appointment.objects.filter(doctor=doctor)
            serializer = AppointmentSerializer(appointments, many=True)
            logger.info(f"Fetched all appointments for doctor {doctor.id}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error fetching appointments for doctor {pk}: {str(e)}")
            raise APIException("Failed to fetch appointments")

class SlotViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    def list(self, request, *args, **kwargs):
        doctor_id = request.query_params.get('doctor_id')
        try:
            if doctor_id:
                logger.info(f"Fetching slots for doctor ID: {doctor_id}")
                slots = Slot.objects.filter(doctor_id=doctor_id)
            else:
                slots = self.get_queryset()

            if not slots.exists():
                raise NotFound("No slots available")

            serializer = self.get_serializer(slots, many=True)
            logger.info("Slots retrieved successfully")
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error fetching slots: {str(e)}")
            raise APIException("Failed to fetch slots")

class PatientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [throttling.UserRateThrottle]

    def retrieve(self, request, pk=None):
        try:
            patient = self.get_object()  # This will use the pk to retrieve the patient
            serializer = self.get_serializer(patient)
            return Response(serializer.data)
        except Patient.DoesNotExist:
            logger.warning(f"Patient with ID {pk} not found.")
            raise NotFound("Patient not found.")
        except Exception as e:
            logger.error(f"Error fetching patient details: {str(e)}")
            return Response({"error": "Failed to fetch patient details."}, status=500)