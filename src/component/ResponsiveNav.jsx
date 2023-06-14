import React from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/home (3).png";
import addIcon from "../assets/add.png";
import userIcon from "../assets/user (2).png";
import aboutIcon from '../assets/info.png'
import logoutIcon from "../assets/sign-out-alt.png";

const ResponsiveNav = () => {

  const user_id = localStorage.getItem('user_id')

  const active = ({ isActive }) => {
    return isActive
      ? "bg-[#f15e3c] p-3 rounded-full"
      : "hover:bg-[#f15e3c] p-3 rounded-full";
  };

  return (
    <div
      id="responsive-nav"
      className="hidden h-full w-[10%] fixed bg-[#121212]"
    >
      <div className="h-full w-full flex flex-col justify-around items-center">
        <div className="w-full flex flex-col items-center gap-10">
          <NavLink to="/home" className={active}>
            <img src={homeIcon} alt="" />
          </NavLink>
          <NavLink to={`/create/${user_id}`} className={active}>
            <img src={addIcon} alt="" />
          </NavLink>
          <NavLink to="/profile" className={active}>
            <img src={userIcon} alt="" />
          </NavLink>
          <NavLink to="/aboutUs" className={active}>
            <img src={aboutIcon} alt="" />
          </NavLink>
        </div>
        <div className="w-full flex justify-center">
          <NavLink
            to='/logout'
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
