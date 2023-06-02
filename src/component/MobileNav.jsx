import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import picture from "../assets/tulisanCariKuliner.png";
import profilePhoto from "../assets/Annoyed.jpeg";

const MobileNav = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleClickNavbar = () => {
    setShowNavbar(true);
  };

  const userName = localStorage.getItem("userName");
  const userID = localStorage.getItem('userID')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('email')
    localStorage.removeItem('userID')
    navigate('/')
  }

  return (
    <>
      <div className="w-full h-[70px] bg-[#121212] flex items-center justify-between px-2">
        <NavLink to='/home' className="w-[50%] pb-2">
          <img className="w-full" src={picture} alt="Logo Restoran XYZ" />
        </NavLink>
        <div
          onClick={handleClickNavbar}
          style={{
            backgroundImage: `url(${profilePhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-[45px] h-[45px] bg-[#292929] rounded-full"
        ></div>
      </div>
      {showNavbar ? (
        <div className="fixed right-1 w-[60%] flex flex-col items-center bg-[#121212] py-2 border border-gray-600">
          <h1 className="text-white text-lg pb-[2%]">
            Hi!{" "}
            <span className="text-[#f15e3c] font-extrabold">{userName}</span>
          </h1>

          <hr className="w-full text-gray-600" />
          <NavLink
            to={`/create/${userID}`}
            className="p-2 w-full text-white hover:bg-[#f15e3c] transition-colors"
          >
            Tambah Kuliner
          </NavLink>
          <NavLink
            to="/profile"
            className="p-2 w-full text-white hover:bg-[#f15e3c] transition-colors"
          >
            Profile
          </NavLink>
          <NavLink
            onClick={handleLogout}
            className="p-2 w-full text-white hover:bg-[#f15e3c] transition-colors"
          >
            Logout
          </NavLink>
        </div>
      ) : null}
    </>
  );
};

export default MobileNav;
