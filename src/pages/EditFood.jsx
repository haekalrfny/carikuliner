import React, { useEffect, useState } from "react";
import InputFood from "../component/InputFood";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import instance from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false)

  const [photo, setPhoto] = useState(null);
  const [nama_kuliner, setNama_kuliner] = useState("");
  const [daerah, setDaerah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState(null);

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
    const getData = () => {
      let config = {
        method: "post",
        url: `/read/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      instance
        .request(config)
        .then((response) => {
          setLoading(false);
          setNama_kuliner(response.data.data.kuliner.nama_kuliner);
          setDaerah(response.data.data.kuliner.daerah);
          setDeskripsi(response.data.data.kuliner.deskripsi);
          setPhoto(response.data.data.kuliner.image);
          fetch(response.data.data.kuliner.image)
            .then((response) => response.blob())
            .then((res) => {
              const file = new File([res], "photo", { type: res.type });
              setImage(file);
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    getData();
  }, [id]);

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingButton(true);

    let data = new FormData();
    data.append("nama_kuliner", nama_kuliner);
    data.append("daerah", daerah);
    data.append("deskripsi", deskripsi);
    data.append("image", image);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `update/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        setLoadingButton(false);
        notifySuccess();
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        setLoadingButton(false);
        notifyWarning();
        console.log(error);
      });
  };

  const notifySuccess = () => {
    toast.success("Kuliner diubah", {
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
    toast.error("Error", {
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
      <div className="flex items-center justify-center h-screen">
        <div className="loader">
          <div className="orbe" style={{ "--index": 0 }}></div>
          <div className="orbe" style={{ "--index": 1 }}></div>
          <div className="orbe" style={{ "--index": 2 }}></div>
          <div className="orbe" style={{ "--index": 3 }}></div>
          <div className="orbe" style={{ "--index": 4 }}></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen bg-[#292929]">
        <div className="w-full h-full pt-[40px] flex flex-col gap-5">
          <div className="px-5 flex items-center gap-5">
            <NavLink to="/home">
              <IoIosArrowBack className="text-[#f15e3c] text-[50px]" />
            </NavLink>
            <div>
              <h1 className="text-white text-4xl font-bold">Ubah Kuliner</h1>
              <p className="text-gray-500 text-sm">Ubahlah kuliner anda</p>
            </div>
          </div>
          <form
            id="edit-form"
            onSubmit={handleSubmit}
            className="flex gap-5 px-5"
          >
            <div id="form-parent" className="w-[50%] flex flex-col">
              <div className="flex flex-col">
                <label className="text-white text-lg font-medium py-2 pl-1">
                  Nama Kuliner
                </label>
                <InputFood
                  placeholder="Masukkan nama kuliner"
                  type="text"
                  value={nama_kuliner}
                  onChange={(e) => setNama_kuliner(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-lg font-medium py-2 pl-1">
                  Foto Kuliner
                </label>
                <div
                  id="edit-photo"
                  className="w-full h-[340px] bg-[#121212] rounded-[12px] flex flex-col justify-center items-center cursor-pointer overflow-hidden border border-[#292929]"
                >
                  {photo ? (
                    <img
                      className="rounded-[20px] w-full bg-center hover:opacity-70"
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
                      className="w-full h-full cursor-pointer rounded-[20px]"
                    ></div>
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
                <label className="text-white text-lg font-medium py-2 pl-1">
                  Daerah asal
                </label>
                <InputFood
                  placeholder="Masukkan daerah"
                  type="text"
                  value={daerah}
                  onChange={(e) => setDaerah(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white text-lg font-medium py-2 pl-1">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Masukkan Deskripsi"
                  className="w-full rounded-[20px] bg-[#121212] outline-none text-white p-3"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={13}
                ></textarea>
              </div>
              <div>
                <button className="w-full mt-5 h-10 rounded-[20px] bg-[#f15e3c] hover:bg-transparent hover:border border-[#f15e3c] flex justify-center items-center">
                  {loadingButton ? (
                    <div class="load"></div>
                  ) : (
                    <p className="text-white text-sm ">Ubah</p>
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
  }
};

export default EditFood;
