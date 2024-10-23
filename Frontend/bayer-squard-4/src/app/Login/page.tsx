"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import withFormWrapper from "@/hoc/withFormWrapper";

// Login Form Component
const LoginForm: React.FC = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Basic email format check (you can replace this with a better regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null);
    }

    // Password length check
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError(null);
    }

    // If both fields are valid
    if (emailPattern.test(email) && password.length >= 6) {
      // Submit the form data
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          aria-invalid={emailError ? "true" : "false"}
          aria-describedby="email-error"
        />
        {emailError && (
          <p id="email-error" className="text-red-500 text-sm mt-1">
            {emailError}
          </p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          minLength={6}
          aria-invalid={passwordError ? "true" : "false"}
          aria-describedby="password-error"
        />
        {passwordError && (
          <p id="password-error" className="text-red-500 text-sm mt-1">
            {passwordError}
          </p>
        )}
      </div>

      <Button text="Login" type="submit" />

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
