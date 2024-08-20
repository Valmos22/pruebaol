import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

import { login } from "../services/authService";
// import { registerUser } from "../services/requestService";


const Login = () => {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };


  const validateUser = async () => {
    setError('');
    try {
      const resLogin = await login(nombre, contrasena);
      return resLogin
    } catch (err) {
      setError('Credenciales incorrectas, intente nuevamente.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    iniciarSesion();
  };

  const iniciarSesion = async () => {
    const valid = await validateUser();
    if (valid.status == 200) {
      navigate('/home');
    } else {
      alert('Login failed: Revisa tus datos');
    }
  };

  return (
    <div className="container-login">
      <form className="container-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <img src="/src/assets/Logo-OL-Software-2-02-150x150.png" alt="Logo" />
        </div>
        <div className="form-group">
          <h1>Bienvenido al gestor de proyectos!</h1>
          <label className="titulo">Necesitamos tu usuario y contrasena</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            placeholder="Nombre de usuario"
            onChange={handleNombreChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={contrasena}
            placeholder="Aqui va tu contrasena"
            onChange={handleContrasenaChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-button">Ingresar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
