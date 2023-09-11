import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import backIcon from "../assets/angle-left.png";
import infoIcon from "../assets/menu-dots-vertical.png";
import cancelIcon from "../assets/cross-small.png";
import instance from "../api/api";

const DetailFood = () => {
  const { id } = useParams();

  const [data, setData] = useState("");
  const [info, setInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);

  const user_id = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

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
    getData();
  }, []);

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
        setData(response.data.data);
        setLike(response.data.data.liked);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const deleteData = (id) => {
    setLoading(true);
    let config = {
      method: "post",
      url: `/delete/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    instance
      .request(config)
      .then((response) => {
        setLoading(false);
        const newData = data && data.id !== id;
        setData(newData);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleLike = () => {
    let config = {
      method: "post",
      url: `/kuliner/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    instance
      .request(config)
      .then((response) => {
        console.log(response.data);
        setLikeAnimation(true);
        setLike(response.data.status);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const isDescriptionLong = data && data.kuliner.deskripsi.length > 1100;

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
      <>
        {data && (
          <div
            id="detail"
            key={data.id}
            style={{
              backgroundImage: `url(${data.kuliner.image})`,
            }}
            className="w-full h-screen bg-[#292929] bg-cover bg-center flex justify-between"
          >
            <div id="detail-left" className="w-[60%] h-full flex flex-col">
              <div
                id="detail-icon"
                className="w-full h-[15%] flex items-center justify-between px-[5%]"
              >
                <NavLink
                  to="/home"
                  className="w-[50px] h-[50px] bg-[#292929] rounded-full flex justify-center items-center"
                >
                  <img className="w-[25px] h-[25px]" src={backIcon} alt="" />
                </NavLink>
                {data.kuliner.user_id == user_id || role == 1 ? (
                  <NavLink
                    id="icon-info"
                    onClick={() => setInfo(true)}
                    className="w-[50px] h-[50px] bg-[#292929] rounded-full flex justify-center items-center"
                  >
                    <img className="w-[25px] h-[25px]" src={infoIcon} alt="" />
                  </NavLink>
                ) : null}
              </div>
            </div>
            <div
              id="detail-right"
              className="w-[40%] h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col gap-3  items-center py-10 px-7 overflow-auto"
            >
              <div id="detail-1" className="w-full flex flex-col">
                <h1
                  id="detail-title"
                  className="text-4xl text-[#f15e3c] font-bold"
                >
                  {data.kuliner.nama_kuliner}
                </h1>
                <h2 className="text-white text-xl">{data.kuliner.daerah}</h2>
              </div>
              <div id="detail-2" className="w-full">
                <h1
                  id="detail-2-h1"
                  className="text-[#f15e3c] text-lg font-bold "
                >
                  Deskripsi :
                </h1>
                <div id="detail-2-p">
                  <p className="text-white text-justify">
                    {showFullDescription
                      ? data.kuliner.deskripsi
                      : data.kuliner.deskripsi.slice(0, 1100)}
                    {!showFullDescription && isDescriptionLong && (
                      <button
                        className="text-[#f15e3c] text-sm underline"
                        onClick={toggleDescription}
                      >
                        read more
                      </button>
                    )}
                  </p>
                </div>
              </div>
              <div
                id="detail-3"
                className="flex items-center justify-between w-full"
              >
                <div>
                  <p className="text-white ">
                    Artikel ditulis oleh
                    <span className="text-[#f15e3c]">
                      {" "}
                      {data.kuliner.user.name}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {like ? (
                    <IoHeart
                      className={`text-red-500 cursor-pointer text-xl ${
                        likeAnimation ? "animate-like" : ""
                      }`}
                      onClick={handleLike}
                    />
                  ) : (
                    <IoHeart
                      className={`text-gray-400 cursor-pointer text-xl ${
                        likeAnimation ? "animate-like" : ""
                      }`}
                      onClick={handleLike}
                    />
                  )}

                  {data.likeTotal === 0 ? (
                    <p></p>
                  ) : data.likeTotal === 1 ? (
                    <p className="text-white">{data.likeTotal} like</p>
                  ) : (
                    <p className="text-white">{data.likeTotal} likes</p>
                  )}
                </div>
              </div>
            </div>
            {info ? (
              <div
                className={`fixed w-full h-screen bg-black bg-opacity-25 flex justify-center items-center ${
                  info ? "opacity-100" : "opacity-0 pointer-events-none"
                } transition-opacity duration-300`}
              >
                <div className="relative w-[300px] bg-[#292929] rounded-[20px] p-6 flex flex-col items-center">
                  <NavLink
                    onClick={() => setInfo(false)}
                    className="absolute top-0 right-0 bg-[#292929] w-[30px] h-[30px] m-2 rounded-full flex items-center justify-center"
                  >
                    <img
                      src={cancelIcon}
                      alt=""
                      className="w-[15px] h-[15px]"
                    />
                  </NavLink>
                  <div className="flex flex-col gap-4">
                    <NavLink
                      to={`/update/${data.kuliner.id}`}
                      className="bg-[#f15e3c] border border-[#f15e3c] rounded-[20px] flex justify-center items-center px-5 py-2 hover:bg-transparent"
                    >
                      <span className="text-white">Edit</span>
                    </NavLink>
                    <NavLink
                      onClick={() => deleteData(data.kuliner.id)}
                      className="bg-[#f15e3c] border border-[#f15e3c] rounded-[20px] flex justify-center items-center px-5 py-2 hover:bg-transparent"
                    >
                      <span className="text-white">Hapus</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </>
    );
  }
};

export default DetailFood;
