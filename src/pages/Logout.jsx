import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/mangkok.png";

const LogoutButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      if (!userToken || userToken === "undefined") {
        return navigate("/");
      }
    };
    checkUserToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("user_id");
    localStorage.removeItem('role')
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div id="logout" className="w-[300px] h-[350px] bg-[#121212] rounded-[12px] flex flex-col justify-center p-7 gap-3">
        <div className="w-full flex justify-center">
          <img className="w-[50px]" src={logo} alt="" />
        </div>
        <div className="w-full px-1 mb-3">
          <h1 className="text-white text-xl font-bold mb-1">
            Keluar dari Cari Kuliner?
          </h1>
          <p className="text-sm text-gray-500">
            Kami harap Anda telah menikmati pengalaman kuliner kami. Kami akan
            senang jika Anda kembali mengunjungi kami di lain waktu.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleLogout}  
            className="w-full text-white text-sm font-semibold py-[8px] bg-[#f15e3c] rounded-[12px] hover:bg-transparent border border-[#f15e3c]"
          >
            Keluar
          </button>
          <NavLink to='/home'>
            <button className="w-full text-white text-sm font-semibold py-[8px] hover:bg-[#161616] border border-[#f15e3c] rounded-[12px]">
              Batal
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LogoutButton;
