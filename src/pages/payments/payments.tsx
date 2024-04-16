import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import apiService from "../../services/apiService";
import functionsService from '../../services/functionsService';
import ActionButtons from "../../components/datatable/actionButtons";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  const columns = [
    { field: "folio", header: "Folio", body: (rowData: any) => <a href="#" onClick={() => alert(rowData.folio)}>Ver</a> },
    { field: "amount", header: "Monto" },
    { field: "name", header: "Titular" },
    { field: "email", header: "Correo electrónico" },
    { field: "items", header: "Producto" },
    { field: "datePayment", header: "Fecha" }
  ];

  useEffect(() => {
    fetchPayments();
  }, []);
  
  const fetchPayments = async () => {
    try {
      let data = await apiService.findAll("payments");

      // Formatear las fechas
      data = data.map((payment: any) => ({
        ...payment,
        datePayment: functionsService.transformDateTime(payment.datePayment),
      }));

      setPayments(data);
    } catch (error: any) {
      functionsService.presentAlertError(error.message);
    }
  };

  const onEdit = () => {
    functionsService.presentAlertWarning("Esta función aún no está disponible");
  }

  const onDelete = (paymentId: any) => {
    try {
      functionsService.presentConfirm(e => {
        if (e) {
          apiService.delete("payments", paymentId);
          functionsService.presentAlertSuccess("Pago eliminado correctamente");
          fetchPayments();
        }
      }, "¿Estás seguro de que quieres eliminar este pago?")
    } catch (error: any) {
      functionsService.presentAlertError(error.message);
    }
  };

  const actionBodyTemplate = (rowData: any) => {
    return <ActionButtons rowData={rowData} onEdit={onEdit} onDelete={onDelete} />;
  };
  
  return (
    <div>
      <h1>Payments</h1>

      <div className="card">
        <DataTable value={payments} tableStyle={{ minWidth: "50rem" }} paginator rows={10} stripedRows>
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} sortable />
          ))}

          <Column body={actionBodyTemplate} header="Acciones" />
        </DataTable>
      </div>
    </div>
  );
};

export default Payments;
