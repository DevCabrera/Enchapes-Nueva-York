import { useState, useEffect } from "react";
import {
  getDirecciones,
  updateDireccion,
  deleteDireccion,
} from "../../../Client/Services/userServices";
import { useAuth } from "../../../Client/Context/AuthProvider";
import AddressModal from "./AddressModal";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2"; // Importar SweetAlert2

const AddressClient = () => {
  const { user } = useAuth();
  const [direcciones, setDirecciones] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchDirecciones = async () => {
      try {
        const data = await getDirecciones(user.email);
        setDirecciones(data);
      } catch (error) {
        console.error("Error al obtener direcciones:", error);
      }
    };
    fetchDirecciones();
  }, [user, navigate]);

  const openModal = (direccion = null) => {
    setSelectedDireccion(direccion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDireccion(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteDireccion(id);
        setDirecciones(direcciones.filter((dir) => dir.id_direccion !== id));

        // Mostrar alerta de éxito
        Swal.fire({
          title: "¡Eliminado!",
          text: "La dirección ha sido eliminada.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error al eliminar dirección:", error);

        // Mostrar alerta de error
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar la dirección.",
          icon: "error",
        });
      }
    }
  };

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

  if (!user) {
    return <p>Redirigiendo...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="font-bold mb-4">Direcciones</h3>
      {direcciones.map((dir) => (
        <div key={dir.id_direccion} className="border p-4 mb-2">
          <div className="flex justify-between">
            <p>
              <strong>
                {dir.favorita ? (
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                ) : (
                  ""
                )}{" "}
                Dirección:
              </strong>{" "}
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
          className="bg-[#2c4255] hover:bg-[#3c5d7a] text-white px-4 py-2 mt-4"
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
