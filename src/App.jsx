import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoutButton from "./pages/Logout";
import AddFood from "./pages/AddFood";
import DetailFood from "./pages/DetailFood";
import EditFood from "./pages/EditFood";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AbousUs from "./pages/AbousUs";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create/:user_id" element={<AddFood />} />
          <Route path="/update/:id" element={<EditFood />} />
          <Route path="/detail/:id" element={<DetailFood />} />
          <Route path='/logout' element={<LogoutButton />} />
          <Route path='/aboutUs' element={<AbousUs/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
