from rest_framework import serializers
from .models import Appointment, Doctor, Slot, Patient

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'  

class DoctorSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField() 
    class Meta:
        model = Doctor
        fields = '__all__'
        
    def get_user_name(self, obj):
        return obj.user.username if obj.user else None


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'id',
            'age',
            'gender',
            'phone',
            'address',
            'blood_type',
            'height',
            'weight',
            'medical_conditions',
            'allergies',
            'medications',
        ]
