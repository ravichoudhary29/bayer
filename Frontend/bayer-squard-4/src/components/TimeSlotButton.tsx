interface TimeSlotButtonProps {
  time: string;
  isSelected: boolean;
  onClick: () => void;
}

const TimeSlotButton: React.FC<TimeSlotButtonProps> = ({
  time,
  isSelected,
  onClick,
}) => (
  <button
    className={`py-2 px-4 border rounded-md focus:outline-none ${
      isSelected ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
    }`}
    type="button"
    onClick={onClick}
  >
    {time}
  </button>
);

export default TimeSlotButton;
