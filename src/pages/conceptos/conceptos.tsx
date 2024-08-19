import { SetStateAction, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import apiService from "../../services/apiService";
import functionsService from "../../services/functionsService";
import ActionButtons from "../../components/datatable/actionButtons";
import { Dialog } from "primereact/dialog";

const Conceptos = () => {
    const [conceptos, setConceptos] = useState([]);
    const [visible, setVisible] = useState(false); // Modal para nuevo producto
    const [isEditMode, setIsEditMode] = useState(false);

    type ProductForm = {
        name: string;
        description: string;
        unitAmount: number;
    };

    const [newProduct, setNewProduct] = useState<ProductForm>({
        name: "",
        description: "",
        unitAmount: 0,
      });
    
      useEffect(() => {
        fetchConceptos();
      }, []);

      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewProduct(prevProduct => ({
          ...prevProduct,
          [name]: name === 'unitAmount' ? parseFloat(value) : value
        }));
      };

      const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const productData = {
            ...newProduct,
            unitAmount: newProduct.unitAmount * 100 // Convertir de pesos (o la moneda que estés usando) a centavos
          };
      
          if (isEditMode) {
            // Aquí podrías manejar la edición del producto si es necesario
          } else {
            await apiService.createStripeProduct(productData);
            functionsService.presentAlertSuccess("Producto creado correctamente");
          }
      
          fetchConceptos(); // Recarga la tabla de productos
          setVisible(false); // Cierra el modal
          setNewProduct({ name: "", description: "", unitAmount: 0 }); // Limpia el formulario
        } catch (error: any) {
          functionsService.presentAlertError(error.message);
        }
      };      

  const fetchConceptos = async () => {
    try {
        let data = await apiService.fetchStripeProducts();

        console.log(data);

        data = data.map((product: any) => ({
            ...product,
            price:
            product.prices && product.prices.length > 0
            ? product.prices[0].unit_amount
            : null,
            viewProduct: (
            <div>
                <ActionButtons
                rowData={product}
                onEdit={onEdit}
                onDelete={onDelete}
                />
            </div>
            ),
        }));
        
        setConceptos(data);
    } catch (error: any) {
        functionsService.presentAlertError(error.message);
    }
  };

  const onEdit = () => {
    functionsService.presentAlertWarning("Esta función aún no está disponible");
  };

  const onDelete = (paymentId: any) => {
    functionsService.presentAlertWarning("Esta función aún no está disponible");
  };

  return (
    <div>
      <h1>Conceptos</h1>

      <div className="text-end m-3">
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setVisible(true); 
            setIsEditMode(false); 
            setNewProduct({ name: "", description: "", unitAmount: 0 });
          }}
        >
          Nuevo concepto [<i className="fas fa-plus"></i>]
        </button>
      </div>

      <div className="card">
        <DataTable
          value={conceptos}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
          stripedRows
        >
          <Column field="id" header="Identificador" sortable />
          <Column field="name" header="Nombre" sortable />
          <Column field="description" header="Descripción" sortable />
          <Column
            field="price"
            header="Precio"
            sortable
            body={(rowData: any) => rowData.price !== null ? `$${(rowData.price / 100).toFixed(2)}` : 'N/A'}
          />
          <Column body={(rowData: any) => rowData.viewProduct} header="Acciones" />
        </DataTable>
      </div>

      <Dialog 
        modal={true} 
        className="card shadow text-center" 
        visible={visible} 
        style={{ width: "25vw", fontSize: "20px", fontFamily: "sans-serif" }} 
        onHide={() => setVisible(false)}
      >
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" value={newProduct.name} onChange={handleChange} className="form-control" placeholder="Por favor, ingrese un nombre..." required></input>

            <label htmlFor="description">Descripción</label>
            <input type="text" id="description" name="description" value={newProduct.description} onChange={handleChange} className="form-control" placeholder="Por favor, ingrese una descripción..." required></input>

            <label htmlFor="unitAmount">Precio</label>
            <input
            type="number"
            id="unitAmount"
            name="unitAmount"
            value={newProduct.unitAmount}
            onChange={handleChange}
            className="form-control"
            placeholder="Por favor, ingrese el precio..."
            required
            />
          </div>

          <button type="submit" className="btn btn-primary m-3">{isEditMode ? "Actualizar" : "Crear"}</button>
        </form>
      </Dialog>
    </div>
  );
};

export default Conceptos;