"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectInput from "@/components/SelectInput";
import TimeSlotButton from "@/components/TimeSlotButton";
import withFormWrapper from "@/hoc/withFormWrapper";
import React from "react";

// Appointment Form Component
interface AppointmentFormProps {
  onSubmit: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const doctors = ["Doctor A", "Doctor B", "Doctor C"];
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
  const handleFormSubmit = (e: unknown) => {
    e.preventDefault();
    alert("Appointment Booked!");
  };

  return (
    <AppointmentFormWithWrapper
      title="Book an Appointment"
      onSubmit={handleFormSubmit}
    />
  );
};

export default AppointmentPage;
