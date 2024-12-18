import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useAuthProvider } from "./useAuthProvider"; // Hook con la lógica de autenticación

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const { user, loginUser, logoutUser, loading } = useAuthProvider();

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Validación de propiedades
AuthProvider.propTypes = { children: PropTypes.node.isRequired };

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
