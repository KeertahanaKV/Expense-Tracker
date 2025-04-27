import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';


const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px]">{label}</label>
      <div className="relative w-full">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none pr-8"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <span className="absolute right-2 top-1 cursor-pointer">
            {showPassword ? (
              <FaRegEye size={22} onClick={toggleShowPassword} />
            ) : (
              <FaRegEyeSlash size={22} onClick={toggleShowPassword} />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
