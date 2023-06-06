import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import backIcon from "../assets/angle-left.png";
import infoIcon from "../assets/menu-dots-vertical.png";
import cancelIcon from "../assets/cross-small.png";
import instance from "../api/api";

const DetailFood = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const [info, setInfo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true)
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
          setLoading(false)
          setData(response.data.data.kuliner);
        })
        .catch((error) => {
          setLoading(false)
          console.log(error);
        });
    };
    getData();
  }, []);

  const deleteData = (id) => {
    setLoading(true)
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
        setLoading(false)
        const newData = data && data.id !== id;
        setData(newData);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
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
    )
  } else {
    return (
      <>
        {data && (
          <div
            id="detail"
            key={data.id}
            style={{
              backgroundImage: `url(${data.image})`,
            }}
            className="w-full h-screen bg-[#292929] bg-cover bg-center flex justify-between"
          >
            <div
              id="detail-left"
              className="w-[60%] h-full flex flex-col justify-between"
            >
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
                <NavLink
                  id="icon-info"
                  onClick={() => setInfo(true)}
                  className="w-[50px] h-[50px] bg-[#292929] rounded-full flex justify-center items-center"
                >
                  <img className="w-[25px] h-[25px]" src={infoIcon} alt="" />
                </NavLink>
              </div>
              <div
                id="detail-img"
                className="w-full h-[20%] flex gap-6 justify-center items-center mb-[8%]"
              >
                <div
                  id="detail-sm-image"
                  className="w-[170px] h-[170px] bg-top"
                  style={{
                    backgroundImage: `url(${data.image})`,
                  }}
                ></div>
                <div
                  id="detail-sm-image"
                  className="w-[170px] h-[170px] bg-center"
                  style={{
                    backgroundImage: `url(${data.image})`,
                  }}
                ></div>
                <div
                  id="detail-sm-image"
                  className="w-[170px] h-[170px] bg-bottom"
                  style={{
                    backgroundImage: `url(${data.image})`,
                  }}
                ></div>
              </div>
            </div>
            <div
              id="detail-right"
              className="w-[40%] h-screen rounded-l-[20px] bg-[rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col gap-5 items-center py-10 px-7"
            >
              <div id="detail-1" className="w-full h-[10%] flex flex-col">
                <h1
                  id="detail-title"
                  className="text-5xl text-[#f15e3c] font-bold"
                >
                  {data.nama_kuliner}
                </h1>
                <h2 className="text-white text-xl">{data.daerah}</h2>
              </div>
              <div id="detail-2" className="w-full h-[80%]">
                <h1
                  id="detail-2-h1"
                  className="text-[#f15e3c] h-[6%] text-xl font-bold "
                >
                  Deskripsi :
                </h1>
                <div id="detail-2-p" className="overflow-y-auto h-[94%]">
                  <p className="text-white text-justify">{data.deskripsi}</p>
                </div>
              </div>
              <div
                id="detail-3"
                className="flex items-center justify-between w-full h-[10%]"
              >
                <p className="text-white">
                  Artikel ditulis oleh
                  <span className="text-[#f15e3c]"> {data.user.name}</span>.
                </p>
                <AiFillLike
                  className={`w-[30px] h-[30px] cursor-pointer ${
                    isLiked ? "text-[#f15e3c]" : "text-white"
                  }`}
                  onClick={handleLikeClick}
                />
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
                    <img src={cancelIcon} alt="" className="w-[15px] h-[15px]" />
                  </NavLink>
                  <div className="flex flex-col gap-4">
                    <NavLink
                      to={`/update/${data.id}`}
                      className="bg-[#f15e3c] border border-[#f15e3c] rounded-full flex justify-center items-center px-5 py-2 hover:bg-transparent"
                    >
                      <span className="text-white">Edit</span>
                    </NavLink>
                    <NavLink
                      onClick={() => deleteData(data.id)}
                      className="bg-[#f15e3c] border border-[#f15e3c] rounded-full flex justify-center items-center px-5 py-2 hover:bg-transparent"
                    >
                      <span className="text-white">Delete</span>
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
