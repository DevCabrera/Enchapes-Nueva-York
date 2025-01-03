import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import {
  Drawer,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "../../../Client/Services/cartServices";

const CartDrawer = ({ open, onClose, token }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(async () => {
    try {
      const data = await getCart(token);
      setCart(data.productos || []);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token, fetchCart]);

  const handleUpdateQuantity = useCallback(async (productId, newQuantity) => {
    try {
      await updateCart(productId, newQuantity, token);
      fetchCart();
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  }, [token, fetchCart]);

  const handleRemoveProduct = useCallback(async (productId) => {
    try {
      await removeFromCart(productId, token);
      fetchCart();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }, [token, fetchCart]);

  const handleClearCart = useCallback(async () => {
    try {
      await clearCart(token);
      fetchCart();
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  }, [token, fetchCart]);

  return (
    <Drawer placement="right" open={open} onClose={onClose} className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Mi Carrito
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <div className="mb-4">
        {cart.length === 0 ? (
          <Typography color="gray" className="text-center">
            Tu carrito está vacío.
          </Typography>
        ) : (
          cart.map((item) => (
            <div
              key={item.id_producto}
              className="flex items-center justify-between p-2 border-b"
            >
              <img
                src={item.producto.imagen_url}
                alt={item.producto.titulo}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1 px-4">
                <Typography variant="h6">{item.producto.titulo}</Typography>
                <Typography color="gray">
                  Precio/m²: ${item.producto.precio}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    handleUpdateQuantity(item.id_producto, item.cantidad - 1)
                  }
                >
                  -
                </Button>
                <Input
                  value={item.cantidad}
                  onChange={(e) =>
                    handleUpdateQuantity(
                      item.id_producto,
                      Number(e.target.value)
                    )
                  }
                  type="number"
                  size="sm"
                  className="w-12 text-center"
                />
                <Button
                  size="sm"
                  onClick={() =>
                    handleUpdateQuantity(item.id_producto, item.cantidad + 1)
                  }
                >
                  +
                </Button>
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
          ))
        )}
      </div>

      <div className="p-4 bg-white shadow-md">
        <Button
          color="red"
          variant="outlined"
          onClick={handleClearCart}
          className="mr-2"
        >
          Vaciar Carrito
        </Button>
        <Button color="green">Proceder al Pago</Button>
      </div>
    </Drawer>
  );
}

CartDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default CartDrawer;
