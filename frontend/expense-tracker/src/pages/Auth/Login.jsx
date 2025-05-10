import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths"; 
import { UserContext } from "../../context/userContext";

// Simple email validation function
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    setError({ email: "", password: "", general: "" });

    if (!validateEmail(email)) {
      setError((prev) => ({ ...prev, email: "Please enter a valid email address" }));
      return;
    }
    if (!password) {
      setError((prev) => ({ ...prev, password: "Please enter a password" }));
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError((prev) => ({ ...prev, general: error.response.data.message }));
      } else {
        setError((prev) => ({ ...prev, general: "Something went wrong. Please try again." }));
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h3>
        <p className="text-sm text-gray-600 mb-6 text-center">Please log in to continue</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {error?.general && <p className="text-red-500 text-sm text-center">{error.general}</p>}

          <Input
            label="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="youremail@example.com"
            type="email"
            className="input-field"
             id="email" 
            name="email"
          />
          {error?.email && <p className="text-red-500 text-sm">{error.email}</p>}

          <Input
            label="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Min 8 Characters"
            type="password"
            className="input-field"
            id="password"  
            name="password" 
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
