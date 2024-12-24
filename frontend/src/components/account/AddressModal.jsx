import { useState } from "react";
import {
  createDireccion,
  updateDireccion,
} from "../../../Client/Services/userServices";
import PropTypes from "prop-types";
import { useAuth } from "../../../Client/Context/AuthProvider";

const AddressModal = ({ isOpen, onClose, direccion, onSave }) => {
  const [formData, setFormData] = useState(
    direccion || { direccion: "", favorita: false }
  );
  const { user } = useAuth();
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedDireccion;
      if (direccion) {
        savedDireccion = await updateDireccion(direccion.id_direccion, {
          ...formData,
        });
      } else {
        savedDireccion = await createDireccion({
          ...formData,
          email: user.email,
        });
      }
      onSave(savedDireccion);
      onClose();
    } catch (error) {
      console.error("Error al guardar dirección:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-xl font-bold mb-4">
          {direccion ? "Editar Dirección" : "Agregar Dirección"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="favorita"
              checked={formData.favorita}
              onChange={handleChange}
            />
            <label className="ml-2 text-gray-700">Marcar como favorita</label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
AddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  direccion: PropTypes.shape({
    id_direccion: PropTypes.number,
    direccion: PropTypes.string,
    favorita: PropTypes.bool,
  }),
  onSave: PropTypes.func.isRequired,
};
export default AddressModal;
