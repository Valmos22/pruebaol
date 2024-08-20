import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Header.css";
import Sidebar from "./Sidebar";

export const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const logout =()=> {
    localStorage.removeItem("token");
    navigate('/login');
  }

  const mainContentStyle = {
    marginLeft: sidebarOpen ? "8rem" : "2rem",
    transition: "margin-left 0.3s",
  };

  return (
    <>
      <nav className="nav">
        <section className="icon-menu">
          <div className="menu-icon">
            <img
              src="/src/assets/fotor-ai-20240430234324.jpg"
              alt="Logo"
            />
          </div>
          <button className="menu-button" onClick={toggleSidebar} style={mainContentStyle}>
            {" "}
            ☰{" "}
          </button>
        </section>

        <section className="avatar">
          <button className="icon-notifi">
            <img src="/src/assets/notificacion.png" alt="notificacion" />
          </button>
          <button className="icon-avatar">
            <img src="/src/assets/perfil.png" alt="perfil" />
          </button>
          <button className="icon-m">
            <img src="/src/assets/tres-puntos.png" alt="tresPuntos" />
          </button>
          <button className="cerrar-sesion" type="button" onClick={logout} >Cerrar sesion</button>
        </section>
      </nav>

      <Sidebar sidebarOpen={sidebarOpen} />
    </>
  );
};
