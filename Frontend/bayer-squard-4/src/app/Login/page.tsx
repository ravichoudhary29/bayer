import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import withFormWrapper from "@/hoc/withFormWrapper";

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
