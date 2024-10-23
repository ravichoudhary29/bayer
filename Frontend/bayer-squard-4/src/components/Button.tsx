// Reusable Button Component
interface ButtonProps {
  text: string;
  type?: "submit" | "button";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "submit",
  className,
}) => (
  <button
    type={type}
    className={
      className ||
      `w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`
    }
  >
    {text}
  </button>
);

export default Button;
