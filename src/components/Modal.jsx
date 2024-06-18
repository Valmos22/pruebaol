import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ isModalOpen }) => {
  const closeModal = () => {
    isModalOpen = false;
    console.log(isModalOpen);
  };

  return (
    <div className={`modal ${isModalOpen ? "open" : "close"}`}>
      {isModalOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <form>
              <h2>Formulario</h2>

              <label className="label">
                Proyecto
                <input type="text" name="proyecto" />
              </label>

              <label className="label">
                Cliente
                <input type="text" name="cliente" />
              </label>

              <label className="label">
                Repositorio
                <input type="text" name="repositorio" />
              </label>

              <label className="checkbox">
                Tiene integración continua
                <input type="checkbox" name="integracionContinua" />
              </label>

              <label className="checkbox">
                Tiene despliegue continuo
                <input type="checkbox" name="despliegueContinuo" />
              </label>

              <label className="label">
                Desarrolladores
                <select name="desarrolladores">
                  <option value="dev1">Desarrollador 1</option>
                  <option value="dev2">Desarrollador 2</option>
                </select>
              </label>

              <label className="label">
                Frontend
                <select name="frontend">
                  <option value="frontend1">Frontend 1</option>
                  <option value="frontend2">Frontend 2</option>
                </select>
              </label>

              <label className="label">
                Backend
                <select name="backend">
                  <option value="backend1">Backend 1</option>
                  <option value="backend2">Backend 2</option>
                </select>
              </label>

              <label className="label">
                Base de datos
                <select name="database">
                  <option value="db1">Base de datos 1</option>
                  <option value="db2">Base de datos 2</option>
                </select>
              </label>

              <div className="buttons">
                <button type="submit" className="btn btn-primary" style={{background: '#0B5ED7'}}>
                  Guardar cambios
                </button>
                <button type="button" style={{background: '#5C636A'}} onClick={closeModal}>
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
};

export default Modal;
