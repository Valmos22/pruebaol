import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "./Home.css";
import { helpHttp } from "../helpers/helpHttp";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Home = () => {
  const [projects, setProjects] = useState(0);
  const [projectsDev, setProjectsDev] = useState(0);
  const [pedingNc, setPedingNc] = useState(0);
  const [errorsDeploy, setErrorsDeploy] = useState(0);

  const [chartData, setChartData] = useState(null);
  const [chartDataBar, setChartDataBar] = useState({
    labels: [],
    datasets: [],
  });

  let api = helpHttp();
  // const apiKey = "2551d724c88a71ef37638f12674ccbfe";
  // const lon = -76.5225;
  // const lat = 3.4372;

  // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const uriProyects = "http://localhost:5000/dashboard_cards";
  const urlServer = "http://localhost:5000/cpu_report";
  const urlCommit = "http://localhost:5000/report_commits";

  useEffect(() => {
    // getClimate();
    getInfoProyects();
    getDataServidor();
    getDataCommits();
  }, []);

  // const getClimate = () => {
  //   api.get(url).then((res) => {
  //   });
  // };

  const getInfoProyects = () => {
    api.get(uriProyects).then((res) => {
      console.log(res);
      if (!res.err) {
        setProjects(res.projects);
        setProjectsDev(res.projects_dev);
        setPedingNc(res.peding_nc);
        setErrorsDeploy(res.errors_deploy);
      } else {
        setProjects(null);
        setProjectsDev(null);
        setPedingNc(null);
        setErrorsDeploy(null);
      }
    });
  };

  const getDataServidor = () => {
    api.get(urlServer).then((res) => {
      if (!res.err) {
        const timeLabels = res.time.map((item) => item.time);
        const timeValues = res.time.map((item) => item.value);
        const percentajeTimeValues = new Array(timeLabels.length).fill(
          res.percentaje_time
        );
        setDataChartLine(timeLabels, timeValues, percentajeTimeValues);
      } else {
        setChartData(null);
      }
    });
  };

  const getDataCommits = () => {
    api.get(urlCommit).then((res) => {
      console.log(res);
      if (!res.err) {
        const monthNames = ["January", "February", "March", "April", "May"];
        const months = res.map((item) => monthNames[item.month - 1]);
        const featData = res.map((item) => item.feat);
        const fixData = res.map((item) => item.fix);
        setDataChartBar(months, featData, fixData);
      } else {
        setChartDataBar(null);
      }
    });
  };

  const setDataChartLine = (timeLabels, timeValues, percentajeTimeValues) => {
    setChartData({
      labels: timeLabels,
      datasets: [
        {
          label: "Time Values",
          data: timeValues,
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Percentage Time",
          data: percentajeTimeValues,
          borderColor: "red",
          borderDash: [5, 5],
          fill: false,
        },
      ],
    });
  };

  const setDataChartBar = (months, featData, fixData) => {
    setChartDataBar({
      labels: months,
      datasets: [
        {
          label: "Features",
          data: featData,
          backgroundColor: "#1F7AFF",
          borderColor: "#1F7AFF",
          borderWidth: 1,
        },
        {
          label: "Fixes",
          data: fixData,
          backgroundColor: "#15128A",
          borderColor: "#15128A",
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="page-home" id="page-home">
      <section className="welcome">
        <h1>Bienvenido Hugo</h1>
        <p>Verifica tus alertas posees 3 alertas sin verificar</p>
      </section>

      <section className="graficas">
        <article className="container-clima">
          <div className="clima">
            <img
              className="icon-clima"
              src="/src/assets/soleado.png"
              alt="soleado"
            />
            <p className="temperatura-clima">
              27<span id="grados">C</span>
            </p>
            <p className="city-clima">
              <span>Cali</span>
              <span style={{ fontSize: "10px" }}>Valle</span>
            </p>
          </div>
          <img src="/src/assets/familia.webp" alt="clima" />
        </article>

        <article className="proyects-user">
          <div className="proyects" style={{ background: "#1F7AFF" }}>
            <p className="tittle-pro">Proyectos Registrardos</p>
            <p className="count-pro">{projects}</p>
            <p className="msm-pro">Ultimo proyecto registrado hace 15 dias</p>
          </div>
          <div className="proyects" style={{ background: "#15128A" }}>
            <p className="tittle-pro">Proyectos en Desarrollo</p>
            <p className="count-pro">{projectsDev}</p>
            <p className="msm-pro">Total de avance 22.00%</p>
          </div>
          <div
            className="proyects"
            style={{ background: "rgb(21 18 138 / 67%)" }}
          >
            <p className="tittle-pro">NC&#39;s sin resolver</p>
            <p className="count-pro">{pedingNc}</p>
            <p className="msm-pro">Ultima NC registrada hace 1 dia</p>
          </div>
          <div
            className="proyects"
            style={{ background: "rgb(201 19 19 / 61%)" }}
          >
            <p className="tittle-pro">Cantidad de Errores</p>
            <p className="count-pro">{errorsDeploy}</p>
            <p className="msm-pro">Ultimo error hace 2 horas</p>
          </div>
        </article>

        <article className="grafica-servidor">
          <h1>Destalles del servidor</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            blanditiis omnis rem
          </p>
          <div style={{ width: '100%', margin: 'auto' }}>
            {chartData ? <Line data={chartData} /> : <p>Loading...</p>}
          </div>
        </article>

        <article className="grafica-comits">
          <div>
            <h1>Reporte de commit</h1>
            <p>Total de commit realizados por cada mes diferenciado entre lo</p>
            <Bar
              data={chartDataBar}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </article>
      </section>
    </div>
  );
};
