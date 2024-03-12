import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../../services/productsService";
import { Dialog } from "primereact/dialog";
import { Button } from "reactstrap";

const Users = () => {
  const [products, setProducts] = useState([]);
  const columns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
  ];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    ProductService.getProductsMini().then((data: any) => setProducts(data));
  }, []);

  return (
    <div>
      <div className="text-end m-3">
        <button
          className="btn btn-primary text-end"
          onClick={() => setVisible(true)}
        >
          Nuevo Usuario
        </button>
      </div>
      <div className="card">
        <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          {columns.map((col, i) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
        </DataTable>
      </div>

      <Dialog
        modal={true}
        className="card shadow text-center"
        visible={visible}
        style={{ width: "20vw", fontSize: "20px", fontFamily: "sans-serif" }}
        onHide={() => setVisible(false)}
      >
        <p className="card-body">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              className="form-control"
              placeholder="Ingresa Nombre Completo"
              required
            />
            <div className="m-3">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                className="form-control"
                placeholder="Ingresa tu Correo Electrónico"
                required
              />
            </div>
            <div className="m-3">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                className="form-control"
                placeholder="Ingresa tu Contraseña"
                required
              />
            </div>
            <div className="m-3">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                className="form-control"
                placeholder="Ingresa tu Teléfono"
                pattern="[0-9]{10}"
              />
            </div>
            <div className="m-3">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                className="form-control"
                placeholder="Ingresa tu Dirección"
              />
            </div>
            <button type="submit" className="btn btn-primary m-3">
              Crear usuario
            </button>
          </div>
        </p>
      </Dialog>
    </div>
  );
};

export default Users;
