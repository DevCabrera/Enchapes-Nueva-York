import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

const AuthHandler = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login"); // Redirigir al login si no hay usuario
      } else if (requiredRole && user.id_tipo_usuario !== requiredRole) {
        navigate("/"); // Redirigir si el rol no coincide
      }
    }
  }, [user, loading, requiredRole, navigate]);

  if (loading) return <p>Cargando...</p>;
  if (!user) return null; // Mostrar nada mientras redirige

  return <>{children}</>;
};

AuthHandler.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.number, // Rol requerido (opcional)
};

export default AuthHandler;
