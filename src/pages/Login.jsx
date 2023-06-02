import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cariKuliner from "../assets/cariKulinerBowl.png";
import footage from "../assets/footage.mp4";
import emailIcon from "../assets/envelope.png";
import passwordIcon from "../assets/lock.png";
import Input from "../component/Input";
import Button from "../component/Button";
import instance from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" && password === "") {
      return false;
    }

    let data = new FormData();
    data.append("email", email);
    data.append("password", password);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/login",
      headers: {},
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem('email', response.data.user.email)
        localStorage.setItem('userID', response.data.user.id)
        console.log(JSON.stringify(response.data));
        alert('login berhasil!')
        navigate("/home");
      })
      .catch((error) => {
        alert('login gagal')
        console.log(error);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <video src={footage} autoPlay loop muted className="bg-video" />
      <div
        id="login"
        className="absolute w-[70%] h-[85vh] rounded-3xl flex items-center overflow-hidden shadow-[20px_20px_50px_rgba(0,0,0,0.5)] bg-[rgba(0,0,0,0.5)] border-t-[1px] border-solid backdrop-blur-md border-[rgba(255,255,255,0.3)] border-l-[1px]"
      >
        <div
          id="login-left"
          className="w-[55%] h-full flex flex-col items-center justify-center"
        >
          <div className="w-full flex justify-center">
            <img className="w-[200px] h-[250px]" src={cariKuliner} alt="" />
          </div>
          <div className="w-full">
            <h1 className="font-bold text-white text-[30px] text-center">
              Selamat datang di Cari Kuliner!
            </h1>
          </div>
          <div className="w-full">
            <p className="text-[#f15e3c] text-sm text-center">
              Aplikasi buat nyari informasi tentang makanan di Indonesia
            </p>
          </div>
        </div>
        <form
          id="login-right"
          onSubmit={handleSubmit}
          className="w-[45%] h-full rounded-3xl bg-[#292929] shadow-[20px_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center px-10 gap-2"
        >
          <div className="w-full">
            <h1 className="font-bold text-white text-[30px]">
              Halo, Selamat datang kembali!
            </h1>
            <p className="text-[#f15e3c] text-[13px]">
              Masukkan email dan password
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-gray-400 text-[15px]" htmlFor="">
              Email
            </label>
            <Input
              src={emailIcon}
              placeholder="Masukkan Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-gray-400 text-[15px]" htmlFor="">
              Password
            </label>
            <Input
              src={passwordIcon}
              placeholder="Masukkan Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full pt-4">
            <Button text="Masuk" />
          </div>
          <p className="text-white text-sm w-full">
            Belum memiliki akun?{" "}
            <span className="text-[#f15e3c] hover:underline">
              <NavLink to="/register">Daftar</NavLink>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
