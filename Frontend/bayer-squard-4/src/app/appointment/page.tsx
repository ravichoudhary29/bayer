"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectInput from "@/components/SelectInput";
import TimeSlotButton from "@/components/TimeSlotButton";
import withFormWrapper from "@/hoc/withFormWrapper";
import React, { useEffect, useState } from "react";

// Appointment Form Component
interface AppointmentFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [doctors, setDoctors] = useState(["Doctor A", "Doctor B", "Doctor C"]);

  const fetchDoctors = async() => {
    const response = await fetch("http://localhost:8000/api/doctors")
    const data = await response.json()
    const doctors = data.map((item:any) => {
      return `Dr ${item.user_name}`; // Generate names like "Doctor A", "Doctor B", etc.
    });
    console.log(doctors);

  setDoctors(doctors)
    console.log("Data",data)
  }

  useEffect(()=>{
    fetchDoctors()
  },[])
  // const [doctors, setDoctors] = useState() 
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <SelectInput
        label="Select Doctor"
        name="doctor"
        options={["Choose a doctor", ...doctors]}
      />
      <Input
        type="date"
        label="Select Date"
        name="date"
        placeholder="mm/dd/yyyy"
      />

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Available Time Slots
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            "9:00 AM",
            "10:00 AM",
            "11:00 AM",
            "1:00 PM",
            "2:00 PM",
            "3:00 PM",
          ].map((time) => (
            <TimeSlotButton
              key={time}
              time={time}
              isSelected={selectedTime === time}
              onClick={() => handleTimeSlotClick(time)}
            />
          ))}
        </div>
      </div>

      <Input
        type="text"
        label="Reason for Visit"
        name="reason"
        placeholder="Enter reason"
      />
      <Input
        type="text"
        label="Additional Notes (Optional)"
        name="notes"
        placeholder="Any additional notes"
      />

      <Button
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="submit"
        text="Confirm Booking"
      />
    </form>
  );
};

// Wrapping AppointmentForm with HOC for consistent layout
const AppointmentFormWithWrapper = withFormWrapper(AppointmentForm);

// Appointment Page
const AppointmentPage: React.FC = () => {

  const appointmentData = {
    appointment_date: "2024-10-23T12:18:15.397029Z", // Assuming this is filled in the form
    status: "S", // Assuming 'S' is a predefined status for the appointment
    reason_for_visit: "hjfhjfhd", // This should come from your form input
    additional_details: "bjbfjhfjs", // This should come from your form input
    patient: 1, // The patient ID should be an integer
    doctor: 1, // The doctor ID should be an integer
    slot: 1, // The slot ID should be an integer
};

const bookAppointment = async () => {
  const response = await fetch("http://localhost:8000/api/appointments/create_appointment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`, // Assuming you store your token in local storage
    },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // setError(errorData.error || "Failed to book appointment");
    return;
  }
}

  useEffect(() => {
    

  }, [])
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    bookAppointment()
  };

  return (
    <AppointmentFormWithWrapper
      title="Book an Appointment"
      onSubmit={handleFormSubmit}
    />
  );
};

export default AppointmentPage;
