from django.contrib import admin
from .models import Patient, Doctor, Slot, Appointment

# Register the Patient model
@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'gender', 'phone', 'blood_type', 'height', 'weight')
    search_fields = ('user__username', 'phone', 'blood_type')
    list_filter = ('gender', 'blood_type')

# Register the Doctor model
@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialization', 'phone', 'room_number')
    search_fields = ('user__username', 'specialization', 'phone')
    list_filter = ('specialization',)

# Register the Slot model
@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'start_time', 'end_time', 'date')
    search_fields = ('doctor__user__username', 'date')
    list_filter = ('doctor__specialization', 'date')

# Register the Appointment model
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'slot', 'appointment_date', 'status', 'reason_for_visit')
    search_fields = ('patient__user__username', 'doctor__user__username', 'status', 'reason_for_visit')
    list_filter = ('status', 'appointment_date', 'doctor__specialization')
    ordering = ('-appointment_date',)

# # Register the PublicInfo model
# @admin.register(PublicInfo)
# class PublicInfoAdmin(admin.ModelAdmin):
#     list_display = ('title', 'description')
#     search_fields = ('title',)
