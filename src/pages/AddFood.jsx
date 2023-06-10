import React, { useEffect, useState } from "react";
import InputFood from "../component/InputFood";
import { HiOutlinePhoto } from 'react-icons/hi2';
import Navbar from "../component/Navbar";
import ResponsiveNav from "../component/ResponsiveNav";
import instance from "../api/api";
import { useNavigate } from "react-router-dom";
import MobileNav from "../component/MobileNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFood = () => {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [nama_kuliner, setNama_kuliner] = useState("");
  const [daerah, setDaerah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

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

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("image", image);
    data.append("nama_kuliner", nama_kuliner);
    data.append("daerah", daerah);
    data.append("deskripsi", deskripsi);
    setLoading(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/create/${user_id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        setLoading(false);
        notifySuccess();
        setTimeout(() => {
          navigate('/home')
        }, 2000)
      })
      .catch((error) => {
        setLoading(false);
        notifyWarning();
        console.log(error);
      });
  };

  const notifySuccess = () => {
    toast.success('Kuliner ditambahkan', {
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

  return (
    <div className="w-full h-screen bg-[#292929]">
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
        id="add-food"
        className="w-full h-full pl-[270px] pt-[3%] flex flex-col gap-5"
      >
        <div id="add-text" className="px-[2.5%]">
          <h1 className="text-white text-4xl font-bold">Tambah Kuliner</h1>
          <p className="text-gray-500 text-sm">
            Bagikan artikel anda disini
          </p>
        </div>
        <form
          id="add-form"
          onSubmit={handleSubmit}
          className="flex gap-5 px-[2.5%]"
        >
          <div id="form-parent" className="w-[50%] flex flex-col">
            <div className="flex flex-col">
              <label className="text-white text-lg font-medium py-2 pl-1">Nama Kuliner</label>
              <InputFood placeholder='Masukkan nama kuliner' type='text' value={nama_kuliner} onChange={(e) => setNama_kuliner(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="text-white text-lg font-medium py-2 pl-1">Foto Kuliner</label>
              <div
                className="w-full h-[265px] bg-[#292929] rounded-[12px] flex flex-col justify-center items-center cursor-pointer overflow-hidden border border-[#292929]"
              >
                {photo ? (
                  <img
                    className="w-full bg-center rounded-[12px] hover:opacity-70"
                    src={photo}
                    alt={nama_kuliner}
                    onClick={() => {
                      document.querySelector("#input-file").click();
                    }}
                  />
                ) : (
                  <div
                    onClick={() => {
                      document.querySelector("#input-file").click();
                    }}
                    className="w-full h-full flex justify-center items-center flex-col cursor-pointer rounded-[12px] bg-[#121212] hover:bg-[#000000]"
                  >
                    <span><HiOutlinePhoto className="w-6 h-6 text-gray-400 mb-1" /></span>
                    <p className="text-gray-400">Masukkan Gambar</p>
                    <p className="text-gray-400">file must be: jpg, pgeg, png.</p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  id="input-file"
                  onChange={fileChangeHandler}
                />
              </div>
            </div>
          </div>
          <div id="form-children" className="w-[50%] flex flex-col">
            <div className="flex flex-col">
              <label className="text-white text-lg font-medium py-2 pl-1">Daerah Asal</label>
              <InputFood placeholder='Masukkan asal daerah' type='text' value={daerah} onChange={(e) => setDaerah(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="text-white text-lg font-medium py-2 pl-1">Deskripsi</label>
              <textarea
                placeholder="Masukkan Deskripsi"
                className="w-full rounded-[12px] bg-[#121212] outline-none text-white p-3"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                rows={10}
              ></textarea>
            </div>
            <div>
              <button className="w-full mt-5 h-10 rounded-[12px] bg-[#f15e3c] hover:bg-transparent hover:border border-[#f15e3c] flex justify-center items-center">
                {loading ? (
                  <div className="load"></div>
                ) : (
                  <p className="text-white text-sm ">Tambah</p>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
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
};

export default AddFood;
