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
  const { user } = useAuth();

  //login para el carro
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const data = await getCart();
          setCart(data.productos || []);
        } catch (error) {
          console.error("Error al obtener el carrito:", error);
        }
      }
    };
    fetchCart();
  }, [user]); // Recargar el carrito cuando el usuario cambia
  // Función genérica para sincronizar el estado del carrito
  const syncCart = async () => {
    try {
      const data = await getCart();
      setCart(data.productos || []);
    } catch (error) {
      console.error("Error al sincronizar el carrito:", error.message);
    }
  };

  useEffect(() => {
    syncCart();
  }, []);

  const addProduct = async (product, quantity) => {
    try {
      await addToCart(product, quantity);
      const updatedCart = await getCart();
      setCart(updatedCart.productos || []);
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
      syncCart();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error.message);
    }
  };

  const removeProduct = async (productId) => {
    try {
      await removeFromCart(productId);
      syncCart();
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
    }
  };

  const clearAll = async () => {
    try {
      await clearCart();
      setCart([]);
    } catch (error) {
      console.error("Error al vaciar el carrito:", error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
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
