import { useState } from "react";
import "../components/Header.css";
import Sidebar from "./Sidebar";

export const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
              src="/src/assets/Logo-OL-Software-2-02-150x150.png"
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
        </section>
      </nav>

      <Sidebar sidebarOpen={sidebarOpen} />
    </>
  );
};
