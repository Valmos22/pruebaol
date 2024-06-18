import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../auth/Login";
import Proyectos from "../pages/Proyectos";
import Roles from "../pages/Roles";
import Usuarios from "../pages/Usuarios";
import { Header } from "../components/Header";
// import Footer from "../components/Footer";

export const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/usuario" element={<Usuarios />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};
