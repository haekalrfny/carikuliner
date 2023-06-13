import React from "react";
import pic from "../assets/_.jpeg";
import pic2 from '../assets/Sho.jpeg'
import pic3 from '../assets/Taku Morisaki Icon_.jpeg'
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineGithub } from 'react-icons/ai'
import {AiOutlineWhatsApp} from 'react-icons/ai'
import Navbar from "../component/Navbar";
import ResponsiveNav from "../component/ResponsiveNav";
import MobileNav from "../component/MobileNav";

const AboutUs = () => {
    return (
        <div className="w-full h-screen bg-[#292929]">
            <Navbar />
            <div id="navbar-responsive" className="h-full fixed flex items-center">
                <ResponsiveNav/>
            </div>
            <div id="mobile-nav" className="hidden fixed z-10 w-full shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
            <MobileNav/>
            </div>
            <div id="about" className="w-full flex flex-col gap-10 pt-[3%] pl-[270px]">
      <div className="w-full flex flex-col items-center gap-2 px-[2.5%]">
        <h1 className="text-white font-bold text-3xl">Tentang Kami</h1>
        <p className="text-gray-400 text-center">
          "Cari Kuliner" adalah sebuah website yang didirikan oleh 3 orang. Website ini berisikan artikel-artikel mengenai kuliner khas yang ada di Indonesia. Website ini berguna untuk anda jika ingin mencari informasi tentang kuliner, bahkan anda bisa memposting artikel kuliner anda sendiri. Ayo mulai "Cari Kuliner" favorit anda disini!
        </p>
      </div>
      <div id="about-card" className="w-full flex gap-5 px-[2.5%]">
        <div id="about-card-child" className="w-[350px] bg-[#121212] rounded-[20px] flex flex-col p-5">
          <div className="flex items-center gap-2">
            <img className="w-[65px] h-[65px] rounded-full" src={pic} alt="" />
            <div>
              <h1 className="text-white font-bold text-lg">Haekal</h1>
              <p className="text-[#f15e3c]">Frontend</p>
            </div>
          </div>
          <p className="text-gray-400 mt-4">
            Nama saya Abdurrahman Haekal Rifany. Saya lahir di lahir di Purwakarta, 12 Juni 2004. Saya seorang pelajar dan ini adalah mini project kedua saya. Bahasa pemograman yang saya kuasai adalah JavaScript. Dan library yang saya pakai adalah React JS.
          </p>
          <div className="flex gap-2 mt-4 justify-center">
            <a href="https://www.instagram.com/haekalrfny/">
              <AiOutlineInstagram className="text-gray-400 hover:text-[#f15e3c] w-[25px] h-[25px]" />
            </a>
            <a href="https://github.com/haekalrfny">
              <AiOutlineGithub className="text-gray-400 hover:text-[#f15e3c] w-[25px] h-[25px]" />
                      </a>
                      <a href="#">
              <AiOutlineWhatsApp className="text-gray-400 hover:text-[#f15e3c] w-[25px] h-[25px]" />
            </a>
          </div>
              </div>
              <div  id="about-card-child" className="w-[350px] bg-[#121212] rounded-[20px] flex flex-col p-5">
          <div className="flex items-center gap-2">
            <img className="w-[65px] h-[65px] rounded-full" src={pic2} alt="" />
            <div>
              <h1 className="text-white font-bold text-lg">Arif</h1>
              <p className="text-[#f15e3c]">Backend</p>
            </div>
          </div>
          <p className="text-gray-400 mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
            consectetur asperiores illo, labore saepe consequuntur, aperiam,
            maiores ullam dolore iure laboriosam doloribus molestias et
            delectus! Magni vitae rem minima esse?
          </p>
          <div className="flex gap-2 mt-4 justify-center">
            <a href="">
              <AiOutlineInstagram className="text-gray-400 hover:text-[#f15e3c] w-[25px] h-[25px]" />
            </a>
            <a href="">
              <AiOutlineGithub className="text-gray-400 hover:text-[#f15e3c] w-[25px] h-[25px]" />
                      </a>
                      <a href="">
              <AiOutlineWhatsApp className="text-gray-400 hover:text-[#f15e3c] w-[25px] h-[25px]" />
            </a>
          </div>
              </div>
              <div  id="about-card-child" className="w-[350px] bg-[#121212] rounded-[20px] flex flex-col p-5">
          <div className="flex items-center gap-2">
            <img className="w-[65px] h-[65px] rounded-full" src={pic3} alt="" />
            <div>
              <h1 className="text-white font-bold text-lg">Fajar</h1>
              <p className="text-[#f15e3c]">Mobile</p>
            </div>
          </div>
          <p className="text-gray-400 mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
            consectetur asperiores illo, labore saepe consequuntur, aperiam,
            maiores ullam dolore iure laboriosam doloribus molestias et
            delectus! Magni vitae rem minima esse?
          </p>
          <div className="flex gap-2 mt-4 justify-center">
            <a href="">
              <AiOutlineInstagram className="text-gray-400 hover:text-[#f15e3c] w-[25px] h-[25px]" />
            </a>
            <a href="">
              <AiOutlineGithub className="text-gray-400 hover:text-[#f15e3c] w-[25px] h-[25px]" />
                      </a>
                      <a href="">
              <AiOutlineWhatsApp className="text-gray-400 hover:text-[#f15e3c] w-[25px] h-[25px]" />
            </a>
          </div>
        </div>
      </div>
    </div>  
      </div>
    
  );
};

export default AboutUs;
