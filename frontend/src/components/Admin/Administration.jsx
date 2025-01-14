import { useState } from "react";
import AdminProductList from "./AdminProductList";
import AdminProductForm from "./AdminProductForm";
import UserListModal from "./UserListModal";

const Administration = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUserListModalOpen, setIsUserListModalOpen] = useState(false);
  return (
    <div className="p-6">
      {" "}
      <h1 className="text-2xl font-bold mb-4">Administración</h1>{" "}
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsFormOpen(true)}
      >
        {" "}
        Agregar Producto{" "}
      </button>{" "}
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setIsUserListModalOpen(true)}
      >
        {" "}
        Lista de Usuarios{" "}
      </button>{" "}
      <AdminProductList />{" "}
      <AdminProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={(newProduct) => console.log("Producto guardado:", newProduct)}
      />{" "}
      <UserListModal
        isOpen={isUserListModalOpen}
        onClose={() => setIsUserListModalOpen(false)}
      />{" "}
    </div>
  );
};

export default Administration;
