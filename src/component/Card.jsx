  import React, { useState } from 'react';
  import { NavLink, useParams } from 'react-router-dom';
  import { IoHeart } from "react-icons/io5";


  const Card = ({ nama_kuliner, deskripsi, image, detail}) => {
    const { id } = useParams();
  
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
      setIsLiked(!isLiked);
    };

    return (
      <div
        id='card'
        style={{
          backgroundImage: `url(${image})`,
        }}
        className="w-[320px] h-[320px] rounded-[20px] shadow-[20px_20px_50px_rgba(0,0,0,0.3)] flex items-end overflow-hidden bg-cover bg-center hover:scale-105 duration-300"
      >
        <div className="w-full h-[50%] bg-[rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-center px-3 py-2 rounded-[20px]">
          <h1 className="text-2xl mt-2 h-[25%] text-white font-bold">{nama_kuliner}</h1>
          <p className="text-xs text-white h-[50%] mb-2 overflow-hidden">
            {deskripsi}
          </p>
          <div className="flex justify-between h-[25%] gap-2 items-center">
            <NavLink
              to={detail}
              className="text-sm px-2 py-1 bg-[#f15e3c] border-[#f15e3c] rounded-full hover:bg-transparent hover:border transition duration-200 text-white font-medium"
            >
              Lihat detail
            </NavLink>
            <div>
            <IoHeart
          className={`w-[30px] h-[30px] cursor-pointer ${
            isLiked ? "text-red-500" : "text-gray-400"
          }`}
          onClick={handleLikeClick}
        />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card;
