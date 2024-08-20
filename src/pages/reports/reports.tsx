import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Bar } from "react-chartjs-2";
import apiService from "../../services/apiService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Payment {
  folio: string;
  amount: number;
  name: string;
  datePayment: string;
}

const Reports = () => {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await apiService.findAll("payments");
      setPayments(data);
      setFilteredPayments(data);
    } catch (error) {
      console.error("Error al cargar los pagos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    if (!fromDate || !toDate) {
        return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(24, 59, 59, 999); // Ajustamos la fecha de finalización para incluir todo el día

    const filtered = payments.filter(payment => {
        const paymentDate = new Date(payment.datePayment);
        return paymentDate >= from && paymentDate <= to;
    });

    setFilteredPayments(filtered);
    setIsFiltered(true); // Mostrar el contenido adicional cuando se aplique el filtro
};


  const totalAmount = filteredPayments.reduce((total, payment) => total + payment.amount, 0);
  const totalPayments = filteredPayments.length;

  const dateTemplate = (rowData: Payment) => {
    return new Date(rowData.datePayment).toLocaleDateString();
  };

  const generateChartData = () => {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const paymentsByMonth = Array(12).fill(0);

    filteredPayments.forEach(payment => {
      const month = new Date(payment.datePayment).getMonth();
      paymentsByMonth[month] += payment.amount;
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Monto de Pagos por Mes",
          data: paymentsByMonth,
          backgroundColor: "rgba(34, 139, 34, 0.2)", // Verde dinero
          borderColor: "rgba(34, 139, 34, 1)", // Verde dinero
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pagos por Mes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div>
      <h1>Reports</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="fromDate">Desde:</label>
          <input
            type="date"
            id="fromDate"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="toDate">Hasta:</label>
          <input
            type="date"
            id="toDate"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="col-md-4 align-self-end">
          <button
            className="btn btn-primary mt-2"
            onClick={handleFilter}
            disabled={!fromDate || !toDate}
          >
            Filtrar
          </button>
        </div>
      </div>

      {isFiltered && (
        <>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Monto Total de Pagos Filtrados</h5>
                  <p className="card-text">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Número Total de Pagos Filtrados</h5>
                  <p className="card-text">{totalPayments}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4" style={{ height: "400px" }}>
            <div className="card-body">
              <Bar data={generateChartData()} options={chartOptions} />
            </div>
          </div>

          <div className="card">
            <DataTable value={filteredPayments} paginator rows={10} stripedRows>
              <Column field="folio" header="Folio" sortable />
              <Column field="amount" header="Monto" sortable />
              <Column field="name" header="Nombre" sortable />
              <Column field="datePayment" header="Fecha de Pago" body={dateTemplate} sortable />
            </DataTable>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
