import os
import django
from django.utils import timezone
from faker import Faker
from datetime import datetime, timedelta
import random

# Set up Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bayer_backend.settings')
django.setup()

# Import your models
from api.models import Patient, Doctor, Slot, Appointment
from django.contrib.auth.models import User

# Initialize Faker
fake = Faker()

# Constants
NUM_DOCTORS = 10
NUM_PATIENTS = 20
NUM_SLOTS_PER_DOCTOR = 5
NUM_APPOINTMENTS = 50

# Create Doctors
def create_doctors():
    specializations = ['GP', 'CD', 'ON', 'NE', 'DE', 'OT']
    for _ in range(NUM_DOCTORS):
        user = User.objects.create_user(
            username=fake.unique.user_name(),
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            password='password123'
        )
        Doctor.objects.create(
            user=user,
            specialization=random.choice(specializations),
            phone=fake.phone_number()[:12],
            room_number=fake.building_number()
        )

# Create Patients
def create_patients():
    blood_types = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    for _ in range(NUM_PATIENTS):
        user = User.objects.create_user(
            username=fake.unique.user_name(),
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email(),
            password='password123'
        )
        Patient.objects.create(
            user=user,
            age=random.randint(18, 80),
            gender=random.choice(['M', 'F', 'O']),
            phone=fake.phone_number()[:12],
            address=fake.address(),
            blood_type=random.choice(blood_types),
            height=round(random.uniform(150.0, 190.0), 1),
            weight=round(random.uniform(50.0, 100.0), 2),
            medical_conditions=fake.sentence(),
            allergies=fake.word(),
            medications=fake.word()
        )

# Create Slots for Doctors
def create_slots():
    doctors = Doctor.objects.all()
    for doctor in doctors:
        for _ in range(NUM_SLOTS_PER_DOCTOR):
            date = fake.date_between(start_date='-30d', end_date='+30d')  # Random date within 30 days past or future
            start_time = fake.time_object(end_datetime=None)
            Slot.objects.create(
                doctor=doctor,
                start_time=start_time,
                date=date
            )

# Create Appointments
def create_appointments():
    patients = Patient.objects.all()
    doctors = Doctor.objects.all()
    slots = Slot.objects.all()

    for _ in range(NUM_APPOINTMENTS):
        patient = random.choice(patients)
        doctor = random.choice(doctors)
        slot = random.choice(slots)
        Appointment.objects.create(
            patient=patient,
            doctor=doctor,
            slot=slot,
            appointment_date=timezone.now(),
            status=random.choice(['S', 'C', 'X']),
            reason_for_visit=fake.sentence(),
            additional_details=fake.text()
        )

# Run the functions to populate data
if __name__ == '__main__':
    print("Creating doctors...")
    create_doctors()
    print("Doctors created.")

    print("Creating patients...")
    create_patients()
    print("Patients created.")

    print("Creating slots...")
    create_slots()
    print("Slots created.")

    print("Creating appointments...")
    create_appointments()
    print("Appointments created.")

    print("Dummy data population completed.")
