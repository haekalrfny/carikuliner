import React from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/home (3).png";
import addIcon from "../assets/add.png";
import userIcon from "../assets/user (2).png";
import logoutIcon from "../assets/sign-out-alt.png";

const ResponsiveNav = () => {

  const userID = localStorage.getItem('userID')

  const active = ({ isActive }) => {
    return isActive
      ? "bg-[#f15e3c] p-3 rounded-full"
      : "hover:bg-[#f15e3c] p-3 rounded-full";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem('userID')
    navigate("/");
  };

  return (
    <div
      id="responsive-nav"
      className="hidden h-[95%] w-[10%] fixed bg-[#121212] rounded-r-[12px]"
    >
      <div className="h-full w-full flex flex-col justify-around items-center">
        <div className="w-full flex flex-col items-center gap-10">
          <NavLink to="/home" className={active}>
            <img src={homeIcon} alt="" />
          </NavLink>
          <NavLink to={`/create/${userID}`} className={active}>
            <img src={addIcon} alt="" />
          </NavLink>
          <NavLink to="/profile" className={active}>
            <img src={userIcon} alt="" />
          </NavLink>
        </div>
        <div className="w-full flex justify-center">
          <NavLink
            onClick={handleLogout}
            className="hover:bg-[#f15e3c] p-3 rounded-full" 
          >
            <img src={logoutIcon} alt="" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveNav;
