import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import { Link } from "react-router-dom";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
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

    if (!fullname.trim()) {
      errors.fullname = "Full name is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError({});
    console.log("Signing up with", fullname, email, password, profilePic);
  };

  return (
    <AuthLayout>
      <div className="w-full  bg-white p-5 rounded-lg shadow-lg flex flex-col justify-center">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Create Your Account</h3>
        <p className="text-sm text-gray-600 mb-6 text-center">Join us today by entering your details below</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <Input
            value={fullname}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
            className="input-field"
          />
          {error?.fullname && <p className="text-red-500 text-sm">{error.fullname}</p>}

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
            Sign Up
          </button>

          <p className="text-sm mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
