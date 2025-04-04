import { useEffect, useState } from "react";
import { Typography, Button, Card, Spinner } from "@material-tailwind/react";
import { useCart } from "../../../Client/Context/cartContext";
import { useAuth } from "../../../Client/Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import formatPriceCLP from "../../../Client/helpers/helperMoney";

const CartDetails = () => {
  const { cart, clearCart, updateQuantity, removeFromCart, idCarro, loading, syncCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSpinner, setShowSpinner] = useState(true); // Estado para controlar el spinner
  const navigate = useNavigate();

  // Sincronizar el carrito al cargar la página
  useEffect(() => {
    const fetchCart = async () => {
      try {
        await syncCart(); // Sincroniza el carrito con el backend
      } catch (error) {
        console.error("Error al sincronizar el carrito:", error);
      } finally {
        setTimeout(() => setShowSpinner(false), 500);
      }
    };
    fetchCart();
  }, [syncCart]);

  // Redirigir al inicio si el usuario no está autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [authLoading, user, navigate]);

  // Calcular el precio total del carrito
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.cantidad * item.producto.precio_m2,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  // Mostrar spinner mientras se sincroniza el carrito o se autentica el usuario
  if (authLoading || loading || showSpinner) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12 text-orange-600" />
      </div>
    );
  }

  const TABLE_HEAD = ["Producto", "Precio/m²", "Cantidad/m²", "Subtotal", "Acciones"];

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        Detalles del Carrito
      </Typography>
      {cart.length === 0 ? (
        <Typography color="gray" className="text-center">
          Tu carrito está vacío.
        </Typography>
      ) : (
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                const isLast = index === cart.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={item.producto.id_producto}>
                    <td className={classes}>
                      <div className="flex items-center">
                        <img
                          src={item.producto.imagenes?.[0]?.url}
                          alt={item.producto.nombre}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.producto.nombre}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {formatPriceCLP(item.producto.precio_m2)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) =>
                          updateQuantity(item.producto.id_producto, Number(e.target.value))
                        }
                        className="w-16 border rounded text-center"
                      />
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {formatPriceCLP(item.cantidad * item.producto.precio_m2)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button
                        size="sm"
                        color="red"
                        variant="outlined"
                        onClick={() => removeFromCart(item.producto.id_producto)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 p-4">
            <Typography variant="h5" className="mb-2">
              Precio Total: {formatPriceCLP(totalPrice)}
            </Typography>
            <div className="flex gap-4">
              <Button color="red" onClick={clearCart}>
                Vaciar Carrito
              </Button>
              <Button
                color="green"
                onClick={() => {
                  if (!idCarro) {
                    console.error("ID del carrito no disponible.");
                    return;
                  }
                  navigate("/payment", { state: { idCarro } });
                }}
              >
                Proceder al Pago
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CartDetails;