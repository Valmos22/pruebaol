import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = ({ sidebarOpen }) => {

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : "close"}`}>
      <ul className="sidebar-menu">
        <li>
          <img src="/src/assets/panel.png" alt="Dashboard" />
          <Link className='link' to="/home">{sidebarOpen && <span>Dashboard</span>}</Link>
        </li>
        <li>
          <img src="/src/assets/gestion-de-carpetas.png" alt="Proyectos" />
          <Link className='link' to="/proyectos">{sidebarOpen && <span>Proyectos</span>}</Link>
        </li>
        <li>
          <img src="/src/assets/perfil-dos.png" alt="Usuario" />
          <Link className='link' to="/usuario">{sidebarOpen && <span>Usuario</span>}</Link>
        </li>
        <li>
          <img src="/src/assets/roles.png" alt="Roles" />
          <Link className='link' to="/roles">{sidebarOpen && <span>Roles</span>}</Link>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
