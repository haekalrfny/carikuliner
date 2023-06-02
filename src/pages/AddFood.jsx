import React, { useEffect, useState } from "react";
import InputFood from "../component/InputFood";
import { useSpring, animated } from "react-spring";
import Navbar from "../component/Navbar";
import addKuliner from "../assets/addKuliner.svg";
import ResponsiveNav from "../component/ResponsiveNav";
import instance from "../api/api";
import { useNavigate } from "react-router-dom";
import MobileNav from "../component/MobileNav";

const AddFood = () => {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [nama_kuliner, setNama_kuliner] = useState("");
  const [daerah, setDaerah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      if (!userToken || userToken === "undefined") {
        return navigate("/");
      }
    };
    checkUserToken();
  }, [navigate]);

  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(0px)" },
    to: { opacity: 1, transform: "translateY(1px)" },
    config: { duration: 1000 },
  });

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
      url: `/create/${userID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        setLoading(false);
        console.log(JSON.stringify(response.data));
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        navigate("/home");
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
      <div id="add-food-page" className="w-full h-screen bg-[#292929]">
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
          id="add-food-parent"
          className="w-full h-full pl-[270px] flex justify-center items-center"
        >
          <div
            id="add-food"
            className="w-[95%] h-[90%] bg-[#121212] rounded-[20px] flex"
          >
            <div
              id="add-food-left"
              className="w-[50%] p-10 h-full flex flex-col justify-center items-center gap-24"
            >
              <div>
                <h1 className="text-white text-3xl font-bold">
                  Tambah Kuliner
                </h1>
              </div>
              <animated.img
                src={addKuliner}
                alt=""
                className="animated-image"
                style={animationProps}
              />
            </div>
            <form
              onSubmit={handleSubmit}
              id="add-food-right"
              className="w-[50%] h-full flex flex-col gap-5 items-center py-[5%] px-[5%]"
            >
              <h1 id="add-food-text" className="hidden">
                Tambah Kuliner
              </h1>
              <div
                id="add-photo"
                className="w-full h-[50%] bg-[#292929] rounded-[20px] flex flex-col justify-center items-center gap-2 cursor-pointer"
              >
                {photo ? (
                  <img
                    className="w-full h-full rounded-[20px]"
                    src={photo}
                    alt={nama_kuliner}
                    onClick={() => {
                      document.querySelector("#input-file").click();
                    }}
                  />
                ) : (
                  <div
                    id="add-photo"
                    onClick={() => {
                      document.querySelector("#input-file").click();
                    }}
                    className="w-full h-full flex justify-center items-center flex-col cursor-pointer rounded-[20px] bg-[#292929] hover:bg-black"
                  >
                    <p className="text-white">Masukkan Gambar</p>
                    <p className="text-white">file must be: jpg, pgeg, png.</p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  id="input-file"
                  onChange={fileChangeHandler}
                />
              </div>
              <div className="w-full flex flex-col gap-5">
                <InputFood
                  placeholder="Nama kuliner"
                  type="text"
                  value={nama_kuliner}
                  onChange={(e) => setNama_kuliner(e.target.value)}
                />
                <InputFood
                  placeholder="Asal daerah"
                  type="text"
                  value={daerah}
                  onChange={(e) => setDaerah(e.target.value)}
                />
                <InputFood
                  placeholder="Deskripsi"
                  type="text"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </div>
              <div className="w-full">
                <button className="w-[100%] h-10 rounded-full bg-[#f15e3c] hover:bg-transparent hover:border border-[#f15e3c]  flex justify-center items-center">
                  <p className="text-white text-[15px]">Tambah</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default AddFood;
