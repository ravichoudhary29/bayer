"use client";

import React from "react";
import { useForm } from "react-hook-form";
// import Input from "@/components/Input";
import Button from "@/components/Button";
import withFormWrapper from "@/hoc/withFormWrapper";

interface FormData {
  email: string;
  password: string;
}

// Login Form Component using React Hook Form
const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Handle form submission
  const onSubmit = (data: FormData) => {
    alert(`Email: ${data.email}\nPassword: ${data.password}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button text="Login" type="submit" />

      {/* Additional Links */}
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
