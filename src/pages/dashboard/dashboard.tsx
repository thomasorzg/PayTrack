import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

// Componentes de Tarjetas
const UsersCard = () => (
  <div className="col-xl-4 col-md-6 mb-4">
    <div className="card shadow h-100 py-2 card2">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs text-success text-uppercase mb-1">
              <b>TOTAL DE USUARIOS</b>
            </div>
            <div className="h5 mb-0 text-gray-800">34 usuarios registrados</div>
          </div>
          <div className="col-auto">
            <i className="fa-solid fa-school fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SystemStatusCard = () => (
  <div className="col-xl-4 col-md-6 mb-4">
    <div className="card shadow h-100 py-2 card2">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs text-success text-uppercase mb-1">
              <b>ESTADO DEL SISTEMA</b>
            </div>
            <div className="h5 mb-0 text-gray-800">
              Funcionando sin interrupciones{" "}
              <i className="fa-solid fa-check-circle text-success"></i>
            </div>
          </div>
          <div className="col-auto">
            <i className="fa-solid fa-heart-pulse fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UpdatesCard = () => (
  <div className="col-xl-4 col-md-6 mb-4">
    <div className="card shadow h-100 py-2 card2">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs text-success text-uppercase mb-1">
              <b>ACTUALIZACIONES PENDIENTES</b>
            </div>
            <div className="h5 mb-0 text-gray-800">
              {/* Muestra la versión actual */}
              <span>
                Versión actual: <b className="text-primary">1.0.0</b>
              </span>
            </div>
            <div className="mt-2">
              {/* Muestra la cantidad de actualizaciones pendientes */}
              <span>
                <b className="text-primary">3</b> actualizaciones pendientes
              </span>
            </div>
          </div>
          <div className="col-auto">
            <i className="fa-solid fa-arrow-up-a-z fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const [options, setOptions] = useState({
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "",
          font: {
            weight: 500,
          },
        },
        grid: {
          color: "",
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: "",
        },
        grid: {
          color: "",
          drawBorder: false,
        },
      },
    },
  });

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const blueColor = documentStyle.getPropertyValue("--blue-500");
    const pinkColor = documentStyle.getPropertyValue("--pink-500");

    const chartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Pronto Pago",
          backgroundColor: blueColor,
          borderColor: blueColor,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "Pagos",
          backgroundColor: pinkColor,
          borderColor: pinkColor,
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    const chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setData(chartData as { labels: never[]; datasets: never[] });
    setOptions(chartOptions);
  }, []);

  return (
    <div>
      <div className="row">
        <UsersCard />
        <SystemStatusCard />
        <UpdatesCard />
      </div>
      <div className="row">
        <div className="col-xl-12 col-md-6 mb-4">
          <div className="card shadow h-100 py-2 card2">
            <div className="card-body">
              <Chart type="bar" data={data} options={options} />
              <div className="col-xl-12 col-md-6 mb-4">
                <div className="card shadow h-100 py-2 card2">
                  <div className="card-body">
                    <img
                      src="../../src/assets/images/bg/calendario.png"
                      className="img-fluid"
                      alt="calendario"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
