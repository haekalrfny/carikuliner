import React from "react";
import picture from "../assets/Annoyed.jpeg";
import Card from "../component/Card";
import MobileNav from "../component/MobileNav";
import Navbar from "../component/Navbar";
import ResponsiveNav from "../component/ResponsiveNav";

const Profile = () => {
  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("email");

  return (
    <div className="w-full h-full bg-[#292929]">
      <Navbar />
      <div id="navbar-responsive" className="h-full fixed flex items-center">
        <ResponsiveNav />
      </div>
      <div
        id="mobile-nav"
        className="hidden fixed z-10 w-full shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
      >
        <MobileNav />
      </div>
      <div
        id="profile"
        className="w-full h-auto pl-[270px] flex flex-col gap-5 items-center"
      >
        <div
          id="profile-card"
          className="w-[95%] mt-[3%] bg-[#121212] rounded-[20px] shadow-lg p-10"
        >
          <div className="flex items-center">
            <img
              className="w-[70px] h-[70px] rounded-full mr-4"
              src={picture}
              alt="Profile Avatar"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">{userName}</h2>
              <p className="text-[#f15e3c] text-sm">{email}</p>
            </div>
          </div>
          <p className="mt-4 text-white">
            I might not be where I want to be yet, but I get closer everyday.
          </p>
          <button className="mt-4 bg-[#f15e3c] hover:bg-transparent border border-[#f15e3c] text-white py-2 px-4 rounded-full">
            Edit Bio
          </button>
        </div>
        <div className="w-[95%] flex flex-col gap-6 justify-center items-center pb-[3%]">
          <h1 className="w-full text-white font-bold text-3xl">Koleksi</h1>
          <div className="w-full flex flex-wrap justify-start gap-5">
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
