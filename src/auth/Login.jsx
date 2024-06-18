import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { helpHttp } from "../helpers/helpHttp";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [dbLogin, setDbLogin] = useState([]);
  const [isValidLogin, setIsValidLogin] = useState(null);

  let api = helpHttp();
  let url = "http://localhost:5000/login";

  const navigate = useNavigate();

  useEffect(() => {
    api.get(url).then((res) => {
      console.log(res);
      if (!res.err) {
        setDbLogin(res);
      } else {
        setDbLogin([]);
      }
    });
  }, []);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const validateUser = (nombre, contrasena) => {
    return dbLogin.some(user => user.user === nombre && user.password === contrasena);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    iniciarSesion();
  };

  const iniciarSesion = () => {
    const valid = validateUser(nombre, contrasena);
    setIsValidLogin(valid);
    if (valid) {
      console.log('Login successful');
      navigate('/home');
    } else {
      console.log('Login failed', isValidLogin);
    }
  };

  return (
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
          placeholder="Nombre de usuario Ej: nombre.apellido"
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
      <div className="form-group checkbox">
        <label id="conectado">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <a href="http://" target="_blank" rel="noopener noreferrer">Permanecer conectado</a>
        </label>
        <a href="http://" target="_blank" rel="noopener noreferrer">Recupera contraseña</a>
      </div>
    </form>
  );
};

export default Login;
