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
      <div className="lg:w-[70%] mid:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-black mb-2">Create an account</h3>
        <p className="text-sm text-slate-700 mb-6">Join us today by entering your details below</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <Input
            value={fullname}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />
          {error?.fullname && <p className="text-red-500 text-sm">{error.fullname}</p>}

          <Input
            label="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="keerthana@gmail.com"
            type="text"
          />
          {error?.email && <p className="text-red-500 text-sm">{error.email}</p>}

          <Input
            label="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Min 8 Characters"
            type="password"
          />
          {error?.password && <p className="text-red-500 text-sm">{error.password}</p>}

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
