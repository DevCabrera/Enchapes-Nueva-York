import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import AdminProductList from "./AdminProductList";
import AdminProductForm from "./AdminProductForm";
import UserListModal from "./UserListModal";

const Administration = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUserListModalOpen, setIsUserListModalOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administración</h1>

      {/* Botón para agregar producto */}
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsFormOpen(true)}
      >
        Agregar Producto
      </button>

      {/* Botón para ver lista de usuarios */}
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setIsUserListModalOpen(true)}
      >
        Lista de Usuarios
      </button>

      {/* Botón para ir a PaymentAdministration */}
      <button
        className="mb-4 bg-purple-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/payment-administration")} // Redirige a la ruta
      >
        Administración de Pagos
      </button>
      {/* Botón para ir a Galeria */}
      <button
        className="mb-4 bg-purple-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/admin/gallery")} // Redirige a la ruta
      >
        ADministrar Galería
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
