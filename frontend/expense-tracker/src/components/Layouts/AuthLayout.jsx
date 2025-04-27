import React from "react";
import card from "../../assets/images/card1.png";
import { LuTrendingUpDown } from "react-icons/lu";

const StatasInfoCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div
      className={`rounded-2xl p-6 shadow-2xl text-white ${color} flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
    >
      <div className="text-4xl bg-white/20 p-4 rounded-full shadow-lg">
        <Icon />
      </div>
      <div>
        <h6 className="text-sm font-medium">{label}</h6>
        <span className="text-3xl font-bold">{value}</span>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex font-sans min-h-screen">
      {/* Left Side */}
      <div className="w-full md:w-[60%] px-12 pt-8 pb-12 bg-white">
        <h1 className="text-3xl font-semibold text-purple-700 mb-6">Expense Tracker</h1>
        {children}
      </div>

      {/* Right Side */}
      <div className="hidden md:block w-[40%] h-screen bg-gradient-to-br from-purple-600 via-fuchsia-600 to-violet-700 relative overflow-hidden p-8 text-white">
        {/* Decorative Shapes */}
        <div className="w-52 h-52 bg-pink-500/50 rounded-full absolute -top-16 -left-10 blur-3xl"></div>
        <div className="w-60 h-60 bg-violet-400/50 rounded-full absolute -bottom-20 -right-12 blur-3xl"></div>
        <div className="w-48 h-56 bg-white/20 rounded-[40px] border border-white/40 absolute -top-[25%] -right-10 rotate-12 shadow-2xl"></div>

        {/* Stats Info Card */}
        <div className="relative z-20 grid grid-cols-1 gap-8 mt-20">
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
          className="w-64 lg:w-[90%] absolute bottom-8 shadow-2xl shadow-white/30 z-10"
          alt="card graphic"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
