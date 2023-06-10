import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import instance from "../api/api";
import Card from "../component/Card";
import MobileNav from "../component/MobileNav";
import Navbar from "../component/Navbar";
import ResponsiveNav from "../component/ResponsiveNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [profilePic, setProfilePic] = useState(false);
  const [profileBio, setProfileBio] = useState(false);
  const [dataProfile, setDataProfile] = useState({});
  const [dataBio, setDataBio] = useState('')
  const [photo, setPhoto] = useState(null);
  const [bio, setBio] = useState(null);
  const [image, setImage] = useState(null);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      if (!userToken || userToken === "undefined") {
        return navigate("/");
      }
    };
    checkUserToken();
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/readId",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      try {
        const response = await instance.request(config);
        setLoading(false);
        setData(response.data.Data);
        setDataUser(response.data.User);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `/read_profile/${user_id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      try {
        const response = await instance.request(config);
        setLoading(false);
        setDataProfile(response.data.data);
        // setDataBio(response.data.data.bio)
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getData();
  }, [user_id]);

  const handlePic = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = new FormData();
    data.append("photo", photo);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/update_profile/${user_id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        setLoading(false);
        setProfilePic(false);
        notifySuccess()
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        notifyWarning()
        console.log(error);
      });
  };

  const handleBio = (e) => {
    e.preventDefault();
    setLoading(true);

    let data = new FormData();
    data.append("bio", bio);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/update_profile/${user_id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        setLoading(false);
        setProfileBio(false);
        notifySuccess()
        window.location.reload();

      })
      .catch((error) => {
        setLoading(false);
        notifyWarning()
        console.log(error);
      });
  };

  const fileChangeHandler = (e) => {
    setPhoto(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    const profileImage = document.getElementById("profile-image-change");
    profileImage.src = URL.createObjectURL(e.target.files[0]);
  };

  const handleProfilePicClick = () => {
    setProfilePic(true);
  };

  const handleModalClose = () => {
    setProfilePic(false);
  };

  const handleProfileBioClick = () => {
    setProfileBio(true);
  };

  const handleCloseBio = () => {
    setProfileBio(false);
  };

  const notifySuccess = () => {
    toast.success('Data diubah', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notifyWarning = () => {
    toast.error('Error', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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
          className="hidden fixed z-10 w-full shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
          id="mobile-nav"
        >
          <MobileNav />
        </div>
        <div
          className="w-full h-auto pl-[270px] flex flex-col gap-5 items-center"
          id="profile"
        >
          <div className="w-[95%] mt-[3%]" id="profile-card">
            <div className="flex items-center">
              <div
                onClick={handleProfilePicClick}
                style={{
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${dataProfile.photo})`,
                }}
                className="w-[70px] h-[70px] rounded-full mr-4 cursor-pointer hover:opacity-50"
              ></div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {dataUser.name}{" "}
                  {dataUser.is_admin == 1 ? (
                    <span className="text-[#f15e3c]">(admin)</span>
                  ) : null}
                </h2>
                <p className="text-white text-sm">{dataUser.email}</p>
              </div>
            </div>
            <p className="mt-4 text-white">{dataProfile.bio}</p>
            <button
              onClick={handleProfileBioClick}
              className="text-sm mt-3 bg-[#f15e3c] hover:bg-transparent border border-[#f15e3c] text-white py-1 px-3 rounded-full"
            >
              Ubah Bio
            </button>
          </div>
          <div className="w-[95%] flex flex-col gap-6 justify-center items-center pb-[100px]">
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            {image ? (
              <img
                id="profile-img"
                src={image}
                className="p-[500px]"
                alt=""
              />
            ) : (
              <img
                id="profile-img-change"
                src={dataProfile.photo}
                className="p-[500px]"
                alt=""
              />
            )}

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
            <div className="flex gap-5 absolute bottom-0 mb-10">
              <button
                className=" text-white text-sm border border-[#f15e3c] bg-[#f15e3c] hover:bg-transparent py-2 px-3 rounded-full"
                onClick={() => {
                  document.querySelector("#input-file").click();
                }}
              >
                <p>Ubah foto</p>
                <input
                  type="file"
                  className="hidden"
                  id="input-file"
                  onChange={fileChangeHandler}
                />
              </button>
              <button
                onClick={handlePic}
                className="text-white text-sm hover:text-[#f15e3c]"
              >
                Unggah
              </button>
            </div>
          </div>
        ) : null}

        {profileBio ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="w-[500px] bg-[#121212] rounded-[20px] flex flex-col gap-2 p-[15px]">
              <h1 className="text-[#f15e3c] text-xl">Ubah Bio</h1>
              <textarea row={13} onChange={(e) => setBio(e.target.value)} placeholder={dataProfile.bio} className="w-full bg-[#121212] outline-none text-white text-xs">

              </textarea>
              <div className="w-full flex justify-end">
                <button onClick={handleBio} className=" text-white border border-[#f15e3c] bg-[#f15e3c] py-1 px-3  text-sm rounded-full hover:bg-transparent">
                  Ubah bio
                </button>
              </div>
            </div>
            <button
              className="absolute top-0 right-0 mt-3 mr-3"
              onClick={handleCloseBio}
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
          </div>
        ) : null}
         <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </div>
    );
  }
};

export default Profile;
