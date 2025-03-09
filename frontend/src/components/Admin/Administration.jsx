import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProductList from "./AdminProductList";
import AdminProductForm from "./AdminProductForm";
import UserListModal from "./UserListModal";
import { useAuth } from "../../../Client/Context/AuthProvider";

const Administration = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUserListModalOpen, setIsUserListModalOpen] = useState(false);
  const { user, loading, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administración</h1>

      {/* Botón para agregar producto */}
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => setIsFormOpen(true)}
      >
        Agregar Producto
      </button>
      <button
        className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => navigate("/admin/products")}
      >
        Administración de Productos beta
      </button>
      {/* Botón para ver lista de usuarios */}
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => setIsUserListModalOpen(true)}
      >
        Lista de Usuarios
      </button>

      {/* Botón para ir a PaymentAdministration */}
      <button
        className="mb-4 bg-purple-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => navigate("/payment-administration")}
      >
        Administración de Pagos
      </button>
      {/* Botón para ir a Galeria */}
      <button
        className="mb-4 bg-purple-500 text-white px-4 py-2 rounded gap-2"
        onClick={() => navigate("/admin/gallery")}
      >
        Administrar Galería
      </button>
      {/* Botón para cerrar sesión */}
      <button
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleLogout}
      >
        Cerrar Sesión
      </button>
      {/* Lista de productos */}
      <AdminProductList />

      {/* Formulario para agregar producto */}
      <AdminProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={(newProduct) => console.log("Producto guardado:", newProduct)}
      />

      {/* Modal de lista de usuarios */}
      <UserListModal
        isOpen={isUserListModalOpen}
        onClose={() => setIsUserListModalOpen(false)}
      />
    </div>
  );
};

export default Administration;