import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import instance from "../api/api";
import picture from "../assets/Annoyed.jpeg";
import Card from "../component/Card";
import MobileNav from "../component/MobileNav";
import Navbar from "../component/Navbar";
import ResponsiveNav from "../component/ResponsiveNav";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [profilePic, setProfilePic] = useState(false);

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      if (!userToken || userToken === "undefined") {
        return navigate("/");
      }
    };
    checkUserToken();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getData = () => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/readId",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      instance
        .request(config)
        .then((response) => {
          setLoading(false);
          setData(response.data.Data);
          setDataUser(response.data.User);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    getData();
  }, []);

  const handleProfilePicClick = () => {
    setProfilePic(true);
  };

  const handleModalClose = () => {
    setProfilePic(false);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else {
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
          <div id="profile-card" className="w-[95%] mt-[3%]">
            <div className="flex items-center">
              <img
                onClick={handleProfilePicClick}
                className="w-[70px] h-[70px] rounded-full mr-4 cursor-pointer hover:opacity-50"
                src={picture}
                alt="Profile Avatar"
              />
              
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {dataUser.name}
                </h2>
                <p className="text-[#f15e3c] text-sm">{dataUser.email}</p>
              </div>
            </div>
            <p className="mt-4 text-white">
              I might not be where I want to be yet, but I get closer everyday.
            </p>
            <NavLink to='/updatebio' >
            <button className="text-sm mt-4 bg-[#f15e3c] hover:bg-transparent border border-[#f15e3c] text-white py-2 px-3 rounded-full">
              Edit Bio
            </button>
            </NavLink>
            
          </div>
          <div className="w-[95%] flex flex-col gap-6 justify-center items-center pb-[3%]">
            <h1 className="w-full text-white font-bold text-3xl">Koleksi</h1>
            <div className="w-full flex flex-wrap justify-start gap-5">
              {data
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((item) => {
                  return (
                    <Card
                      key={item.id}
                      nama_kuliner={item.nama_kuliner}
                      deskripsi={item.deskripsi}
                      image={item.image}
                      detail={`/detail/${item.id}`}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        {profilePic ? (
                <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <img
                    id="profile-img"
                    className="w-[500px] h-[500px]"
                    src={picture}
                    alt=""
                  />
                  <button
                    className="absolute top-0 right-0 mt-3 mr-3"
                    onClick={handleModalClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-500 hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 5.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button id="profile-button" className="absolute bottom-0 mb-10 text-white text-sm border border-[#f15e3c] bg-[#f15e3c] hover:bg-transparent py-2 px-3 rounded-full">
                    Ubah Photo
                  </button>
                </div>
              ) : null}
      </div>
    );
  }
};

export default Profile;
