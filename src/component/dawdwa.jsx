import React, { useEffect, useState } from "react";
import InputFood from "../component/InputFood";
import { useSpring, animated } from "react-spring";
import addKuliner from "../assets/addKuliner.svg";
import backIcon from "../assets/angle-left.png";
import photoIcon from "../assets/file-image.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import instance from "../api/api";

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const animationProps = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { duration: 1000 },
  });

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
    setLoading(true);

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
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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
      <div id="edit-food-page" className="w-full h-screen bg-[#292929]">
        <div
          id="edit-food-parent"
          className="w-full h-full flex flex-col gap-5 pt-[40px] "
        >
          <div id="edit-food" className="w-full h-full flex">
            <div
              id="edit-food-left"
              className="w-[50%] p-10 h-full flex flex-col justify-center items-center gap-20"
            >
              <div className="flex gap-20">
                <NavLink to="/home">
                  <img src={backIcon} alt="" />
                </NavLink>
                <h1 className="text-white text-3xl font-bold">Edit Kuliner</h1>
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
              id="edit-food-right"
              className="w-[50%] h-full flex flex-col gap-5 items-center py-[5%] px-[5%]"
            >
              <div id="edit-food-text" className="hidden">
                <NavLink to="/home">
                  <img src={backIcon} alt="" />
                </NavLink>
                <h1 className="text-4xl text-white font-bold">Edit Kuliner</h1>
              </div>
              <div
                id="add-photo"
                className="w-full h-[50%] bg-[#121212] rounded-[20px] flex flex-col justify-center items-center gap-2 cursor-pointer"
              >
                {photo ? (
                  <img
                    className="rounded-[20px] w-full h-full cursor-pointer"
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
                  <p className="text-white text-[15px]">Edit</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default EditFood;
