import { useEffect, useState } from "react";
import functionsService from "../../services/functionsService";
import { useAuth } from "../../context/AuthContext";
import apiService from "../../services/apiService";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

type ItemCarrito = {
    concepto: string;
    precio: number,
    cantidad: number
}

interface StripePrice {
  id: string;
  unit_amount: number;
}

interface StripeProduct {
  id: string;
  name: string;
  prices: StripePrice[];
}

type ProductsState = StripeProduct[];

const PagosAcademicos = () => {
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
    const [products, setProducts] = useState<ProductsState>([]);

    useEffect(() => {
      const loadProducts = async () => {
        try {
          const products = await apiService.fetchStripeProducts();

          setProducts(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          functionsService.presentAlertError("Failed to load Stripe products.");
        }
      };
      
      loadProducts();
      checkPaymentSuccess();
    }, [location.search]);

    const checkPaymentSuccess = () => {
      const queryParams = new URLSearchParams(location.search);
      const session_id = queryParams.get('session_id');

      if (session_id) {
        const paymentData = sessionStorage.getItem('paymentData');

        if (paymentData) {
          apiService.create("payments", paymentData).then(() => {
            sessionStorage.removeItem('paymentData'); // Limpiar datos de pago
            
            Swal.fire({
              title: '¡Pago realizado!',
              text: 'Tú pago ha sido procesado exitosamente.',
              icon: 'success',
              confirmButtonText: 'Entendido'
            });
          }).catch(error => {
            console.error('Error recording payment:', error);
          });
        }
      }
    };

    const agregarAlCarrito = () => {
        const select = document.getElementById('conceptoPago') as HTMLSelectElement | null;
        
        if (select && select.selectedIndex > 0) {
          const selectedOption = select.options[select.selectedIndex];
          const product = products.find(p => p.name === selectedOption.text);

          if (!product) {
            functionsService.presentAlertError("Producto no encontrado");
            return;
          }

          const precio = product.prices[0].unit_amount / 100;
          const concepto = selectedOption.text;

          const existingItemIndex = carrito.findIndex(item => item.concepto === concepto);
          if (existingItemIndex !== -1) {
            const newCarrito = [...carrito];
            newCarrito[existingItemIndex].cantidad += 1;
            setCarrito(newCarrito);
          } else {
            const nuevoItem = { concepto, precio, cantidad: 1 };
            setCarrito([...carrito, nuevoItem]);
          }
        } else {
          functionsService.presentAlertError("Seleccione un concepto de pago");
        }
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    const eliminarDelCarrito = (indice: any) => {
        const nuevoCarrito = [...carrito];
        nuevoCarrito.splice(indice, 1);
        setCarrito(nuevoCarrito);
    };

    const handleCheckout = async () => {
      try {
        const cartItems = { items: carrito.map(item => ({
          concepto: item.concepto,
          precio: item.precio,
          cantidad: item.cantidad
        }))};

        const data = {
          ...cartItems,
          user
        }
        
        const response = await apiService.createCheckoutSession(data);

        if (response.data.url) {
          const dataWithUser = {
            ...response.data.paymentData,
            name: user?.name,
            email: user?.email,
            datePayment: new Date().toISOString()
          }

          sessionStorage.setItem('paymentData', JSON.stringify(dataWithUser));  // Guardar datos de pago
          window.location.href = response.data.url;
        } else {
          functionsService.presentAlertError("No session URL returned");
        }
      } catch (error: any) {
        functionsService.presentAlertError("Ha ocurrido un error al procesar el pago. Por favor, intente nuevamente.");
        console.error("Payment failed", error);
      }
    }

    const subtotal = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    const total = subtotal;

    return (
      <div className="container mt-4">
        <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="m-0 font-weight-bold text-primary">{isAuthenticated && user && user?.name} - Matrícula: L53456789</h6>
          </div>
          <button type="button" className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
        </div>
      </div>
        <h1 className="text-center mb-4">Realizar Pagos Académicos</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Realizar Pago de:</h6>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <select className="form-control" id="conceptoPago">
                  <option value="">Seleccione el concepto de pago</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.prices[0].id}>{product.name}</option>
                  ))}
                </select>
              </div>

              <hr></hr>

              <button type="button" className="btn btn-success mt-2" onClick={agregarAlCarrito}>Agregar al Carrito [<i className="fas fa-cart-plus"></i>]</button>
              &nbsp;
              <button type="button" className="btn btn-secondary mt-2 ml-2" onClick={limpiarCarrito}>Limpiar Carrito [<i className="fas fa-trash-alt"></i>]</button>
            </form>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-8">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Detalle del Carrito</h6>
                        </div>
              <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Concepto</th>
                            <th scope="col">Costo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {carrito.map((item, index) => (
                            <tr key={index}>
                                <td>{item.concepto}</td>
                                <td>${item.precio.toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => eliminarDelCarrito(index)}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Total del Pago</h6>
              </div>
              <div className="card-body">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Total: ${total.toFixed(2)}</p>
                <button type="button" className="btn btn-primary w-100" onClick={handleCheckout}>Pagar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PagosAcademicos;
  