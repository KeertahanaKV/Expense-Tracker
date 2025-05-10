import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type, id, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={id} className="text-[13px]">{label}</label>
      <div className="relative w-full">
        <input
          id={id}                   
          name={name}             
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none pr-8"
          value={value}
          onChange={onChange}
          autoComplete="on"         
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
