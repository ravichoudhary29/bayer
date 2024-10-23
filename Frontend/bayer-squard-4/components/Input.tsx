// Reusable Input Component
interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, placeholder, name, required }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Input;
