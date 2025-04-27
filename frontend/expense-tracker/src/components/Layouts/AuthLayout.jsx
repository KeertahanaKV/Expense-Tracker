import React from "react";
import card from "../../assets/images/card1.png";
import { LuTrendingUpDown } from "react-icons/lu";

const StatasInfoCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg text-white ${color} flex items-center gap-4 transition-all duration-300 hover:scale-105`}
    >
      <div className="text-4xl bg-white/10 p-3 rounded-full">
        <Icon />
      </div>
      <div>
        <h6 className="text-sm font-medium">{label}</h6>
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex font-sans">
      {/* Left Side */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-white">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">💰 Expense Tracker</h1>
        {children}
      </div>

      {/* Right Side */}
      <div className="hidden md:block w-[40vw] h-screen bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-700 relative overflow-hidden p-8 text-white">
        {/* Decorative Shapes */}
        <div className="w-52 h-52 bg-pink-500/30 rounded-full absolute -top-16 -left-10 blur-3xl"></div>
        <div className="w-60 h-60 bg-violet-400/30 rounded-full absolute -bottom-20 -right-12 blur-3xl"></div>
        <div className="w-48 h-56 bg-white/10 rounded-[40px] border border-white/20 absolute -top-[25%] -right-10 rotate-12 shadow-xl"></div>

        {/* Stats Info Card */}
        <div className="relative z-20 grid grid-cols-1 gap-6 mt-20">
          <StatasInfoCard
            icon={LuTrendingUpDown}
            label="Track income & expenses"
            value="₹430,000"
            color="bg-purple-800/80"
          />
        </div>

        {/* Card Image */}
        <img
          src={card}
          className="w-64 lg:w-[90%] absolute bottom-8 shadow-2xl shadow-white/10 z-10"
          alt="card graphic"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
