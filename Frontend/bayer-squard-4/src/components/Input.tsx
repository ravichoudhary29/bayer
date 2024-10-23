// Reusable TextInput Component
interface TextInputProps {
  type: string;
  placeholder: string;
  label: string;
  name: string;
}

const Input: React.FC<TextInputProps> = ({
  type,
  placeholder,
  label,
  name,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-gray-700 text-sm font-semibold mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
export default Input;
