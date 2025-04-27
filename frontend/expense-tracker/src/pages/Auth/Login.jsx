import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import {  Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();

    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email format is invalid";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError({});
    console.log("Logging in with", email, password);
    // your login logic goes here
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 mid:h-full flex flex-col justify-center">
        <h1 className="text-xl font-semibold text-black">Welcome Back</h1>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              label="Email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="keerthana@gmail.com"
              type="text"
            />
            {error?.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Min 8 Characters"
              type="password"
            />
            {error?.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/Signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
