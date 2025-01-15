import { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useCart } from "../../../Client/Context/cartContext";
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Calcular el precio total del carrito
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.cantidad * item.producto.precio_m2,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  // Manejar la actualización de cantidades
  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  // Manejar la eliminación de un producto
  const handleRemoveProduct = (productId) => {
    removeFromCart(productId);
  };

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
        <div>
          {cart.map((item) => (
            <div
              key={item.id_producto}
              className="flex justify-between items-center border-b py-4"
            >
              <img
                src={item.producto.foto}
                alt={item.producto.nombre}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1 px-4">
                <Typography variant="h6">{item.producto.nombre}</Typography>
                <Typography color="gray">
                  Precio/m²: ${item.producto.precio_m2}
                </Typography>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.cantidad}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.id_producto,
                      Number(e.target.value)
                    )
                  }
                  className="w-16 border rounded text-center"
                />
              </div>
              <Button
                size="sm"
                color="red"
                variant="outlined"
                onClick={() => handleRemoveProduct(item.id_producto)}
              >
                Eliminar
              </Button>
            </div>
          ))}
          <div className="mt-4">
            <Typography variant="h5" className="mb-2">
              Precio Total: ${totalPrice}
            </Typography>
            <div className="flex gap-4">
              <Button color="red" onClick={clearCart}>
                Vaciar Carrito
              </Button>
              <Button color="green" onClick={() => navigate("/checkout")}>
                Proceder al Pago
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
