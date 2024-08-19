import { SetStateAction, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import apiService from "../../services/apiService";
import functionsService from '../../services/functionsService';
import ActionButtons from "../../components/datatable/actionButtons";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [selectedFolio, setSelectedFolio] = useState(null);

  console.log(selectedFolio);

  useEffect(() => {
    fetchPayments();
  }, []);
  
  const fetchPayments = async () => {
    try {
      let data = await apiService.findAll("payments");

      data = data.map((payment: any) => ({
        ...payment,
        datePayment: functionsService.transformDateTime(payment.datePayment),
        viewFolio: (
          <div>
            <ActionButtons rowData={payment} onEdit={onEdit} onDelete={onDelete} />
            <button className="btn btn-primary" onClick={() => handleViewFolio(payment.folio)}>Ver Folio</button>
          </div>
        )
      }));

      setPayments(data);
    } catch (error: any) {
      functionsService.presentAlertError(error.message);
    }
  };

  const handleViewFolio = (folio: SetStateAction<null>) => {
    setSelectedFolio(folio);
    window.alert(`${folio}`);
  };

  const onEdit = () => {
    functionsService.presentAlertWarning("Esta función aún no está disponible");
  };

  const onDelete = (paymentId: any) => {
    try {
      functionsService.presentConfirm(e => {
        if (e) {
          apiService.delete("payments", paymentId);
          functionsService.presentAlertSuccess("Pago eliminado correctamente");
          fetchPayments();
        }
      }, "¿Estás seguro de que quieres eliminar este pago?");
    } catch (error: any) {
      functionsService.presentAlertError(error.message);
    }
  };

  return (
    <div>
      <h1>Pagos</h1>

      <div className="card">
        <DataTable value={payments} tableStyle={{ minWidth: "50rem" }} paginator rows={10} stripedRows>
          <Column field="amount" header="Monto" sortable body={(rowData: any) => `$${rowData.amount.toFixed(2)}`} />
          <Column field="name" header="Titular" sortable />
          <Column field="email" header="Correo electrónico" sortable />
          <Column field="items" header="Producto" sortable />
          <Column field="datePayment" header="Fecha" sortable />
          <Column body={(rowData: any) => rowData.viewFolio} header="Acciones" />
        </DataTable>
      </div>
    </div>
  );
};

export default Payments;
