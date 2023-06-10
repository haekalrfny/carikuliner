import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Search from "../component/Search";
import Carousel from "../component/Carousel";
import Card from "../component/Card";
import ResponsiveNav from "../component/ResponsiveNav";
import { useNavigate, useParams } from "react-router-dom";
import MobileNav from "../component/MobileNav";
import instance from "../api/api";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [visibleCards, setVisibleCards] = useState(6);

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
        url: "/home",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      instance
        .request(config)
        .then((response) => {
          setLoading(false);
          setData(response.data.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };
    getData();
  }, []);

  useEffect(() => {
    const results = data.filter((item) =>
      item.nama_kuliner.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResult(results);
  }, [searchQuery, data]);

  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => {
      const newVisibleCards = prevVisibleCards + 6;
      if (newVisibleCards >= searchResult.length) {
        document.getElementById("load-more").style.display = "none";
      }
      return newVisibleCards;
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
    )
  } else {
    return (
      <>
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
          <div id="home" className="w-full h-full flex flex-col pl-[270px]">
            <h1
              id="home-text"
              className="w-full text-white text-4xl font-bold px-[3%] pb-[24px] pt-[3%]"
            >
              Carilah Kuliner Favoritmu!
            </h1>
            <div
              id="home-carousel"
              className="w-full h-[460px] flex justify-center items-center px-[3%] pb-[3%]"
            >
              <Carousel />
            </div>
            <div className="w-full h-[100px]">
              <Search value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div
              id="home-card-parent"
              className="w-full flex flex-col gap-6 justify-center items-center pb-[3%] px-[3%]"
            >
              <h1 className="w-full text-white text-3xl font-bold pl-[1%]">
                Daftar Kuliner
              </h1>
              {searchResult.length > 0 ? (
                <>
                  <div
                    key={id}
                    id="home-card"
                    className="w-full mx-[3%] flex flex-wrap justify-start gap-5"
                  >
                    {searchResult
                      .slice(0, visibleCards)
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
                  <div id="load-more" className="w-full flex justify-center">
                    <button
                      className="text-white bg-[#f15e3c] border border-[#f15e3c] rounded-full hover:bg-transparent text-sm py-1 px-3 mt-4"
                      onClick={loadMoreCards}
                    >
                      Load More
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-gray-400">kuliner tidak ada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Home;
