import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import { Link } from "react-router-dom";

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
  };

  return (
    <AuthLayout>
      <div className="w-full  bg-white p-29 rounded-lg shadow-lg flex flex-col justify-center">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h3>
        <p className="text-sm text-gray-600 mb-6 text-center">Please log in to continue</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="youremail@example.com"
            type="email"
            className="input-field"
          />
          {error?.email && <p className="text-red-500 text-sm">{error.email}</p>}

          <Input
            label="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Min 8 Characters"
            type="password"
            className="input-field"
          />
          {error?.password && <p className="text-red-500 text-sm">{error.password}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Login
          </button>

          <p className="text-sm mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
