import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddFood from "./pages/AddFood";
import DetailFood from "./pages/DetailFood";
import EditFood from "./pages/EditFood";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create/:userID" element={<AddFood />} />
          <Route path="/update" element={<EditFood />} />
          <Route path="/detail/:id" element={<DetailFood />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
