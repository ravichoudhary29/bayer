// Reusable SelectInput Component
interface SelectInputProps {
  options: string[];
  label: string;
  name: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, label, name }) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-gray-700 text-sm font-semibold mb-2"
    >
      {label}
    </label>
    <select
      name={name}
      id={name}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
