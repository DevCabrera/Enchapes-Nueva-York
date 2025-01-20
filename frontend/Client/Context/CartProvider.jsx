import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CartContext from "../Context/cartContext";
import { useAuth } from "../Context/AuthProvider";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "../Services/cartServices";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [idCarro, setIdCarro] = useState(null); // Manejo del ID del carrito
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const data = await getCart();
          setCart(data.productos || []);
          setIdCarro(data.id_carro); // Guardar el ID del carrito
        } catch (error) {
          console.error("Error al obtener el carrito:", error);
        }
      } else {
        setCart([]);
        setIdCarro(null); // Reinicia el ID del carrito si no hay usuario
      }
    };
    fetchCart();
  }, [user]);

  const syncCart = async () => {
    try {
      const data = await getCart();
      setCart(data.productos || []);
      setIdCarro(data.id_carro);
    } catch (error) {
      console.error("Error al sincronizar el carrito:", error.message);
    }
  };

  const addProduct = async (product, quantity) => {
    try {
      await addToCart(product, quantity);
      await syncCart();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const updateProductQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      console.warn("La cantidad debe ser mayor a cero.");
      return;
    }
    try {
      await updateCart(productId, quantity);
      await syncCart();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error.message);
    }
  };

  const removeProduct = async (productId) => {
    try {
      await removeFromCart(productId);
      await syncCart();
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
    }
  };

  const clearAll = async () => {
    try {
      await clearCart();
      setCart([]);
      setIdCarro(null); // Reinicia el ID del carrito al vaciarlo
    } catch (error) {
      console.error("Error al vaciar el carrito:", error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        idCarro, // Ahora el ID del carrito está disponible
        addToCart: addProduct,
        updateQuantity: updateProductQuantity,
        removeFromCart: removeProduct,
        clearCart: clearAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
