import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import picture from "../assets/tulisanCariKuliner.png";
import profilePhoto from "../assets/Annoyed.jpeg";

const MobileNav = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navbarRef = useRef(null);

  const handleClickNavbar = () => {
    setShowNavbar(true);
  };

  const handleCloseNavbar = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseNavbar);

    return () => {
      document.removeEventListener("mousedown", handleCloseNavbar);
    };
  }, []);

  const userName = localStorage.getItem("name");
  const user_id = localStorage.getItem("user_id");

  return (
    <>
      <div className="w-full h-[70px] bg-[#121212] flex items-center justify-between px-2">
        <NavLink to="/home" className="w-[50%] pb-2">
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
        <div
          ref={navbarRef}
          className="fixed right-1 w-[60%] flex flex-col items-center bg-[#121212] py-2 pt-0 border border-gray-600"
        >
          <h1 className="w-full p-2 text-white text-lg bg-[#1f1f1f]">
            Hi!{" "}
            <span className="text-[#f15e3c] text-xl font-extrabold">{userName}</span>
          </h1>
          <NavLink
            to={`/create/${user_id}`}
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
            to="/logout"
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
