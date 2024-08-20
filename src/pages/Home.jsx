import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { createRequest, deleteRequest, getEmployees, getRequests } from "../services/requestService";
import "./Home.css";

export const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [requests, setRequests] = useState([]);
  const [inform, setInform] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formDataRequest, setFormDataRequest] = useState({
    codigo: '',
    descripcion: '',
    resumen: '',
    id_empleado: '',
  });

  useEffect(() => {
    fetchEmployees();
    fetchRequest();
  }, [setRequests, setEmployees]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      if (decodedToken.role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, [isAdmin]);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const fetchRequest = async () => {
    try {
      const data = await getRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const handleChange = (e) => {
    setFormDataRequest({
      ...formDataRequest,
      [e.target.name]: e.target.value,
    });
  };

  const sendDataRequest = async (e) => {
    e.preventDefault();
    try {
      await createRequest(formDataRequest);
      alert('Solicitud creada con éxito');
    } catch (error) {
      alert('Hubo un error al crear la solicitud');
    }
  };

  const fetchCreateRequest = () => {
    return (
      <form onSubmit={sendDataRequest}>
        <div className="form-div">
          <label>Código:</label>
          <input
            type="text"
            name="codigo"
            value={formDataRequest.codigo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-div">
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={formDataRequest.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-div">
          <label>Resumen:</label>
          <textarea
            name="resumen"
            value={formDataRequest.resumen}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-div">
          <label>ID del Empleado:</label>
          <input
            type="number"
            name="id_empleado"
            value={formDataRequest.id_empleado}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Solicitud</button>
      </form>
    );
  }

  const fetchDeleteRequest = async (id) => {
    try {
      await deleteRequest(id);
      setRequests(requests.filter(request => request.id !== id));
    } catch (err) {
      console.log(err)
    }
  };

  const informacion = (info) => {
    setInform([info])
  }

  const showInfoEmployee = () => {
    return (
      <>
        <div className="">
          {inform.map(inf => (
            <ul key={inf.id}>
              <li>ID: {inf.id}</li>
              <li>NOMBRE: {inf.nombre}</li>
              <li>USERNAME: {inf.username}</li>
              <li>FECHA INGRESO: {inf.fecha_ingreso}</li>
              <li>SALARIO: {inf.salario}</li>
              <li>CONTRASENA: {inf.password}</li>
              <li>ROL: {inf.role}</li>
              <li>FECHA CRACION: {inf.createdAt}</li>
              <li>FECHA ACTUALIZACION: {inf.updatedAt}</li>
            </ul>
          ))}
        </div>
      </>
    )
  }


  return (
    <div className="page-home" id="page-home">
      <section className="welcome">
        <h1>Bienvenido</h1>
      </section>

      <section className="lst">
        <div className="lst-empleados">
          <h1>Lista de Empleados</h1>
          <br></br>

          <table className="tabla">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Username</th>
                <th>Fecha Ingreso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(empleado => (
                <tr key={empleado.id}>
                  <td className="line">{empleado.id}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.username}</td>
                  <td>{empleado.fecha_ingreso}</td>
                  {isAdmin && (<td>
                    <button onClick={() => (informacion(empleado))}>Ver</button>
                  </td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>

          <div className="info">
            {showInfoEmployee()}
          </div>
        </div>

        <div className="lst-solicitud">
          <h1>Lista de Solicitudes</h1>
          <br></br>

          <table className="tabla">
            <thead>
              <tr>
                <th>Id</th>
                <th>Id Empleado</th>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Resumen</th>
                <th>Fecha Creacion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(solici => (
                <tr key={solici.id}>
                  <td className="line">{solici.id}</td>
                  <td>{solici.id_empleado}</td>
                  <td>{solici.codigo}</td>
                  <td>{solici.descripcion}</td>
                  <td>{solici.resumen}</td>
                  <td>{solici.createdAt}</td>
                  {isAdmin && (<td>
                    <button onClick={() => fetchDeleteRequest(solici.id)}>Eliminar</button>
                  </td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          {isAdmin && (<div className="creat-request">
            <section className="welcome">
              <h1>Crear Solicitud</h1>
            </section>
            <br></br>
            {fetchCreateRequest()}
          </div>)}
        </div>
      </section>

    </div>
  );
};
