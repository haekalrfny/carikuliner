import React from "react";
import { NavLink } from "react-router-dom";
import picture from "../assets/tulisanCariKuliner.png";
import homeIcon from "../assets/home (3).png";
import addIcon from "../assets/add.png";
import userIcon from "../assets/user (2).png";
import aboutIcon from '../assets/info.png'
import logoutIcon from "../assets/sign-out-alt.png";

const Navbar = () => {

  const user_id = localStorage.getItem('user_id')

  const active = ({ isActive }) => {
    return isActive
      ? 'flex px-3 p-2 gap-5 items-center bg-[#f15e3c] rounded-full '
      : 'flex px-3 p-2 gap-5 items-center hover:bg-[#f15e3c] rounded-full transition duration-200'
  }

  return (
    <div id="navbar" className="w-[270px] h-full fixed bg-[#121212] flex flex-col">
      <div className="w-full h-[10%] flex items-end justify-center">
        <img className="w-[50%]" src={picture} alt="" />
      </div>
      <div className="w-full h-[90%] flex flex-col justify-between py-[10%]">
        <div className="px-[10%] w-full flex flex-col gap-4">
          <NavLink
            to="/home"
            className={active}
          >
            <img
              src={homeIcon}
              alt=""
            />
            <h1 className="text-white text-base font-semibold">Beranda</h1>
          </NavLink>
          <NavLink
            to={`/create/${user_id}`}
            className={active}
          >
            <img src={addIcon} alt="" />
            <h1 id="navbar-text" className="text-white text-base font-semibold">
              Tambah Kuliner
            </h1>
          </NavLink>
          <NavLink
            to="/profile"
            className={active}
          >
            <img src={userIcon} alt="" />
            <h1 className="text-white text-base font-semibold">Profil</h1>
          </NavLink>
         
        </div>
        <div className="w-full px-[10%] flex flex-col gap-4">
        <NavLink
            to="/aboutUs"
            className={active}
          >
            <img src={aboutIcon} alt="" />
            <h1 className="text-white text-base font-semibold">Tentang kami</h1>
          </NavLink>  
          <NavLink
            to='/logout'
            className='flex px-3 p-2 gap-5 items-center hover:bg-[#f15e3c] rounded-full transition duration-200'
          >
            <img src={logoutIcon} alt="" />
            <h1 className="text-white text-base font-bold">Keluar</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
