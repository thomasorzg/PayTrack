import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import apiService from "../../services/apiService";
import functionsService from '../../services/functionsService';
import ActionButtons from "../../components/datatable/actionButtons";

const Users = () => {
  const [visible, setVisible] = useState(false); // Modal
  const [users, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  
  type UserForm = {
    name: string;
    email: string;
    password?: string;
    isActive: string;
    role: string;
  };

  const [newUser, setNewUser] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    isActive: "",
    role: ""
  });

  const columns = [
    { field: "name", header: "Nombre" },
    { field: "email", header: "Correo electrónico" },
    { field: "role", header: "Rol" },
    { field: "createdAt", header: "Creado en" },
    { field: "updatedAt", header: "Actualizado en" }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      let data = await apiService.findAll("users");

      // Formatear las fechas
      data = data.map((user: any) => ({
        ...user,
        createdAt: functionsService.transformDateTime(user.createdAt),
        updatedAt: functionsService.transformDateTime(user.updatedAt)
      }));

      setUsers(data);
    } catch (error: any) {
      functionsService.presentAlertError(error.message);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({ ...prevUser, [name]: value}));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let payload: UserForm = { ...newUser };

      if (isEditMode) {
        if (!newUser.password) {
          // Si no hay contraseña, elimina el campo de la contraseña del payload
          const { password, ...rest } = newUser;
          payload = rest;
        }
        
        await apiService.update("users", editingUserId, payload);
        functionsService.presentAlertSuccess("Usuario actualizado correctamente");

        setEditingUserId(null); // Limpia el ID del usuario
      } else {
        await apiService.create("users", newUser);
        functionsService.presentAlertSuccess("Usuario creado correctamente");
      }

      fetchUsers(); // Recarga la tabla de usuarios
      setVisible(false); // Cierra el modal
      setNewUser({ name: "", email: "", password: "", isActive: "", role: "" }); // Limpia el formulario
      setIsEditMode(false); // Desactiva el modo edición
    } catch (error: any) {
      functionsService.presentAlertError(error.message);
    }
  }

  const onEdit = (userData: any) => {
    setNewUser({
      name: userData.name,
      email: userData.email,
      password: '', // Generalmente no cargamos la contraseña para editar
      isActive: userData.isActive.toString(),
      role: userData.role,
    });
    setEditingUserId(userData._id); // Guarda el ID del usuario
    setIsEditMode(true);
    setVisible(true);
  };

  const onDelete = (userId: any) => {
    const currentUserStr = sessionStorage.getItem("user");

    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);

      if (userId === currentUser.id) {
        functionsService.presentAlertWarning("No puedes eliminar tu propia cuenta mientras tienes una sesión activa.");
        return;
      }
    }

    try {
      functionsService.presentConfirm(e => {
        if (e) {
          apiService.delete("users", userId);
          functionsService.presentAlertSuccess("Usuario eliminado correctamente");
          fetchUsers();
        }
      }, "¿Estás seguro de que quieres eliminar este usuario?")
    } catch (error: any) {
      functionsService.presentAlertError(error.message);
    }
  };

  const actionBodyTemplate = (rowData: any) => {
    return <ActionButtons rowData={rowData} onEdit={onEdit} onDelete={onDelete} />;
  };

  const isActiveTemplate = (rowData: any) => {
    return (
      <span 
        className={`badge ${rowData.isActive ? 'bg-success' : 'bg-danger'}`}>
        {rowData.isActive ? 'SI' : 'NO'}
      </span>
    );
  };
  
  return (
    <div>
      <h1>Usuarios</h1>

      <div className="text-end m-3">
        <button 
          className="btn btn-primary text-end" 
          onClick={() => {
            setVisible(true); 
            setIsEditMode(false); 
            setNewUser({ 
              name: "", 
              email: "", 
              password: "", 
              isActive: "", 
              role: "" 
            });
            setEditingUserId(null);
          }}
        >
          Nuevo usuario [<i className="fas fa-plus"></i>]
        </button>
      </div>

      <div className="card">
        <DataTable value={users} tableStyle={{ minWidth: "50rem" }} paginator rows={10} stripedRows>
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} sortable />
          ))}

          <Column body={isActiveTemplate} header="Activo" sortable />

          <Column body={actionBodyTemplate} header="Acciones" />
        </DataTable>
      </div>

      <Dialog modal={true} className="card shadow text-center" visible={visible} style={{ width: "25vw", fontSize: "20px", fontFamily: "sans-serif" }} onHide={() => setVisible(false)}>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" value={newUser.name} onChange={handleChange} className="form-control" placeholder="Por favor, ingrese un nombre..." required></input>

            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" value={newUser.email} onChange={handleChange} className="form-control" placeholder="Por favor, ingrese un correo electrónico..." required></input>

            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" value={newUser.password} onChange={handleChange} className="form-control" placeholder="Por favor, ingrese una contraseña..." required={!isEditMode}></input>

            <label htmlFor="role">Rol</label>
            <select id="role" name="role" value={newUser.role} onChange={handleChange} className="form-control" required>
              <option value="" disabled selected>Selecciona un rol...</option>
              <option value="STUDENT">Estudiante</option>
              <option value="ADMIN">Administrador</option>
              <option value="SUPERADMIN">Super Administrador</option>
            </select>

            <label htmlFor="isActive">Activo</label>
            <select id="isActive" name="isActive" value={newUser.isActive.toString()} onChange={handleChange} className="form-control" required>
              <option value="" disabled selected>Selecciona un estado...</option>
              <option value="true">SI</option>
              <option value="false">NO</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary m-3">{isEditMode ? "Actualizar" : "Crear"}</button>
        </form>
      </Dialog>
    </div>
  );
};

export default Users;
