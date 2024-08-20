import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import apiService from "../../services/apiService";
import UsersCard from "./UsersCard";
import SystemStatusCard from "./SystemStatusCard";
import UpdatesCard from "./UpdatesCard";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAlumnos, setTotalAlumnos] = useState(0);
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
    fetchUsersData();

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

  const fetchUsersData = async () => {
    try {
      let data = await apiService.findAll("users");

      // Calcular el número total de usuarios y de alumnos
      setTotalUsers(data.length);
      setTotalAlumnos(data.filter((user: any) => user.role === "STUDENT").length);

    } catch (error: any) {
      console.error("Error al obtener los usuarios", error);
    }
  };

  return (
    <div>
      <div className="row">
        <UsersCard totalUsers={totalUsers} totalAlumnos={totalAlumnos} />
        <SystemStatusCard />
        <UpdatesCard />
      </div>
      <div className="row">
        <div className="col-xl-12 col-md-6 mb-4">
          <div className="card shadow h-100 py-2 card2">
            <div className="card-body">
{/*               <Chart type="bar" data={data} options={options} />
 */}              <div className="col-xl-12 col-md-6 mb-4">
                <div className="card shadow h-100 py-2 card2">
                  <div className="card-body">
                    <img
                      src="https://scontent.fcen1-1.fna.fbcdn.net/v/t39.30808-6/427919911_706999904951192_8350894050844778251_n.png?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeE5NaW8isP1Dmhhg_FSvX-TLmbsY7g_L_wuZuxjuD8v_B3jVpNCj3iJhoYOqQfqkwYzOjz1xhiPPJHPOGjNBTsz&_nc_ohc=ea7Pl-4J0LoQ7kNvgFr92ur&_nc_ht=scontent.fcen1-1.fna&oh=00_AYAgxn9J1705Th1pV3H8Zt9Ih6c14gDsgU1W_bnddM2WUg&oe=66CA6099"
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
