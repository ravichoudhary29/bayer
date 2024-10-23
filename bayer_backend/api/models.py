from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime, timedelta

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to the User model
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    BLOOD_TYPE_CHOICES = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]

    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    phone = models.CharField(max_length=15, unique=True)
    address = models.TextField()
    
    # Basic Health Information
    blood_type = models.CharField(max_length=3, choices=BLOOD_TYPE_CHOICES)
    height = models.DecimalField(max_digits=4, decimal_places=1, help_text="Height in centimeters")
    weight = models.DecimalField(max_digits=5, decimal_places=2, help_text="Weight in kilograms")
    medical_conditions = models.TextField(blank=True, help_text="List any known medical conditions")
    allergies = models.TextField(blank=True, help_text="List any known allergies")
    medications = models.TextField(blank=True, help_text="List any current medications")

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to the User model
    SPECIALIZATION_CHOICES = [
        ('GP', 'General Practitioner'),
        ('CD', 'Cardiologist'),
        ('ON', 'Oncologist'),
        ('NE', 'Neurologist'),
        ('DE', 'Dermatologist'),
        ('OT', 'Orthopedic'),
        # Add more specializations as needed
    ]

    specialization = models.CharField(max_length=2, choices=SPECIALIZATION_CHOICES)
    phone = models.CharField(max_length=15, unique=True)
    room_number = models.CharField(max_length=10)

    def __str__(self):
        return f"Dr. {self.user.first_name} {self.user.last_name} - {self.get_specialization_display()}"

class Slot(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    start_time = models.TimeField()
    date = models.DateField()

    # Automatically calculate the end time based on start time and fixed duration of 1 hour
    @property
    def end_time(self):
        return (datetime.combine(self.date, self.start_time) + timedelta(hours=1)).time()

    def __str__(self):
        return f"{self.doctor.user.username} - {self.start_time} to {self.end_time} on {self.date}"

    class Meta:
        unique_together = ('doctor', 'start_time', 'date')  # Ensure slots are unique per doctor per date

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('S', 'Scheduled'),
        ('C', 'Completed'),
        ('X', 'Cancelled'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='S')
    reason_for_visit = models.TextField()
    additional_details = models.TextField(blank=True, null=True)  # Optional field    

    def __str__(self):
        return f"Appointment: {self.patient} with Dr. {self.doctor} on {self.appointment_date.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        ordering = ['-appointment_date']
        
class PublicInfo(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)  # Optional field
    content = models.TextField()

    def __str__(self):
        return self.title
