import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import ReactPaginate from "react-paginate";
import "./Proyectos.css";
import Modal from "../components/Modal";

const Proyectos = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [projectsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let api = helpHttp();
  const uri = "http://localhost:5000/projects";

  useEffect(() => {
    getAllProyects();
  }, []);

  const offset = currentPage * projectsPerPage;
  const currentProjects = projects.slice(offset, offset + projectsPerPage);
  const pageCount = Math.ceil(projects.length / projectsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const getAllProyects = () => {
    api.get(uri).then((res) => {
      console.log(res);
      if (!res.err) {
        setProjects(res);
      } else {
        setProjects(null);
      }
    });
  };

  const showPopUp = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="page-proyect" id="page-proyect">
      <h1>Lista de Proyectos Registrados</h1>
      <div className="button">
        <button type="button" onClick={showPopUp}>
          Nuevo proyecto
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Proyecto</th>
            <th>Repositorio</th>
            <th>Desarrolladores</th>
            <th>CI</th>
            <th>CD</th>
            <th>Frontend</th>
            <th>Backend</th>
            <th>DB</th>
            <th>Alertas</th>
            <th>Errores</th>
            <th>Cant. Despliegues</th>
            <th>Avance</th>
            <th>Reporte NC&#39;s</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.project_name}</td>
              <td>
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.repo_url}
                </a>
              </td>
              <td>{project.developers}</td>
              <td>{project.ci ? "Yes" : "No"}</td>
              <td>{project.cd ? "Yes" : "No"}</td>
              <td>{project.frontend_tecnology}</td>
              <td>{project.backend_tecnology}</td>
              <td>{project.databases}</td>
              <td>{project.warning_count}</td>
              <td>{project.errors_count}</td>
              <td>{project.deploy_count}</td>
              <td>{project.percentage_completion}%</td>
              <td>{project.report_nc}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      <Modal isModalOpen={isModalOpen} />
    </div>
  );
};

export default Proyectos;
