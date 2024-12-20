import { useState, useEffect } from "react";
import {
  getDirecciones,
  updateDireccion,
  deleteDireccion,
} from "../../../Client/Services/userServices";
import { useAuth } from "../../../Client/Context/AuthProvider";
import AddressModal from "./AddressModal";

const AddressClient = () => {
  const { user } = useAuth(); // Obtener el usuario actual
  const [direcciones, setDirecciones] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState(null); // Dirección seleccionada para editar
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal

  // Traer las direcciones al cargar el componente
  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const data = await getDirecciones(user.email); // Llamada al backend
        setDirecciones(data);
      } catch (error) {
        console.error("Error al obtener direcciones:", error);
      }
    };
    fetchDirecciones();
  }, [user.email]);

  // Abrir el modal para agregar o editar dirección
  const openModal = (direccion = null) => {
    setSelectedDireccion(direccion);
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setSelectedDireccion(null);
    setIsModalOpen(false);
  };

  // Eliminar una dirección
  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta dirección?");
    if (!confirm) return;

    try {
      await deleteDireccion(id);
      setDirecciones(direcciones.filter((dir) => dir.id_direccion !== id));
    } catch (error) {
      console.error("Error al eliminar dirección:", error);
    }
  };

  // Establecer como favorita
  const handleFavorite = async (id) => {
    try {
      await updateDireccion(id, { favorita: true });
      const updatedDirecciones = direcciones.map((dir) =>
        dir.id_direccion === id
          ? { ...dir, favorita: true }
          : { ...dir, favorita: false }
      );
      setDirecciones(updatedDirecciones);
    } catch (error) {
      console.error("Error al marcar dirección como favorita:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="font-bold mb-4">Direcciones</h3>
      {direcciones.map((dir) => (
        <div key={dir.id_direccion} className="border p-4 mb-2">
          <div className="flex justify-between">
            <p>
              <strong>{dir.favorita ? "★" : ""} Dirección:</strong>{" "}
              {dir.direccion}
            </p>
            <input
              type="radio"
              name="favorita"
              checked={dir.favorita}
              onChange={() => handleFavorite(dir.id_direccion)}
            />
          </div>
          <div className="mt-2">
            <button
              onClick={() => openModal(dir)}
              className="text-blue-500 mr-4"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(dir.id_direccion)}
              className="text-red-500"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {direcciones.length < 3 && (
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Agregar dirección
        </button>
      )}
      <AddressModal
        isOpen={isModalOpen}
        onClose={closeModal}
        direccion={selectedDireccion}
        onSave={(newDireccion) => {
          if (selectedDireccion) {
            setDirecciones(
              direcciones.map((dir) =>
                dir.id_direccion === newDireccion.id_direccion
                  ? newDireccion
                  : dir
              )
            );
          } else {
            setDirecciones([...direcciones, newDireccion]);
          }
        }}
      />
    </div>
  );
};

export default AddressClient;
