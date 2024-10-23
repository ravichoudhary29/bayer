import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Image from "next/image";

interface FormProps {
  title: string;
  children?: React.ReactNode;
}

const withFormWrapper = <P extends object>(
  Component: React.ComponentType<P>
) => {
  // eslint-disable-next-line react/display-name
  return (props: P & FormProps) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="items-center w-full flex justify-center">
          <Image className="mb-4" alt="" src={"/"} height={150} width={150} />
        </div>
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          {props.title}
        </h2>
        <Component {...props} />
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm: React.FC = () => {
  return (
    <form className="space-y-4">
      <Input type="email" placeholder="Email" name="email" required />
      <Input type="password" placeholder="Password" name="password" required />
      <Button text="Login" />
      <div className="text-center text-sm">
        <a href="#" className="text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>
      <div className="text-center text-sm">
        <span>New User? </span>
        <a href="#" className="text-blue-500 hover:underline">
          Register here
        </a>
      </div>
    </form>
  );
};

// Wrapping the LoginForm with HOC for consistent styling
const LoginWithFormWrapper = withFormWrapper(LoginForm);

// Page Component
const LoginPage: React.FC = () => {
  return <LoginWithFormWrapper title="Login" />;
};

export default LoginPage;
