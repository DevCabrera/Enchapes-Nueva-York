import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  createProduct,
  updateProduct,
} from "../../../Client/Services/productServices";
import { Button } from "@material-tailwind/react";

const AdminProductForm = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    sku: "",
    nombre: "",
    ancho: "",
    alto: "",
    espesor: "",
    peso_m2: "",
    precio_m2: "",
    fotos: [], //ARRAY DE FOTOS
    ...product,
  });

  useEffect(() => {
    if (product) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...product,
        fotos: product.fotos || [], //ESPERAR AL CAMBIO DE LAS FOTOS Y ALMACENARLAS
      }));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fotos") {
      // Si es un archivo, agregar múltiples imágenes al array
      setFormData((prevFormData) => ({
        ...prevFormData,
        fotos: [...prevFormData.fotos, ...Array.from(files)],
      }));
    } else {
      // Para el resto de los campos
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    // Eliminar una imagen específica por índice
    setFormData((prevFormData) => ({
      ...prevFormData,
      fotos: prevFormData.fotos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      for (let key in formData) {
        if (key === "fotos") {
          formData[key].forEach((file) => {
            formDataToSubmit.append("fotos", file);
          });
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      }

      let savedProduct;
      if (product) {
        savedProduct = await updateProduct(
          product.id_producto,
          formDataToSubmit
        );
      } else {
        savedProduct = await createProduct(formDataToSubmit);
      }
      onSave(savedProduct);
      onClose();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.className.includes("modal-overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full h-3/4 overflow-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Registrar Producto</h2>
            <Button size="sm" color="red" onClick={onClose}>
              &times;
            </Button>
          </div>
          <label className="block text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block text-gray-700">Ancho</label>
          <input
            type="number"
            name="ancho"
            value={formData.ancho}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block text-gray-700">Alto</label>
          <input
            type="number"
            name="alto"
            value={formData.alto}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block text-gray-700">Espesor</label>
          <input
            type="number"
            name="espesor"
            value={formData.espesor}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block text-gray-700">Peso M2</label>
          <input
            type="number"
            name="peso_m2"
            value={formData.peso_m2}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block text-gray-700">Precio M2</label>
          <input
            type="number"
            name="precio_m2"
            value={formData.precio_m2}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <label className="block text-gray-700">Fotos</label>
          <input
            type="file"
            name="fotos"
            onChange={handleChange}
            className="w-full mb-4 p-2"
            multiple
          />
          {formData.fotos.length > 0 && (
            <div className="w-full mb-4">
              <img
                src={
                  typeof formData.fotos[0] === "string"
                    ? formData.fotos[0]
                    : URL.createObjectURL(formData.fotos[0])
                }
                alt="Producto"
                className="w-32 h-32 object-cover rounded mb-2"
              />
              <Button
                size="sm"
                color="red"
                onClick={() => handleRemoveImage(0)}
                className="mb-2"
              >
                Eliminar Primera Imagen
              </Button>
              <div className="flex flex-wrap gap-4">
                {formData.fotos.slice(1).map((foto, index) => (
                  <div key={index + 1} className="flex flex-col items-center">
                    <img
                      src={
                        typeof foto === "string"
                          ? foto
                          : URL.createObjectURL(foto)
                      }
                      alt={`Producto ${index + 2}`}
                      className="w-24 h-24 object-cover rounded mb-2"
                    />
                    <Button
                      size="sm"
                      color="red"
                      onClick={() => handleRemoveImage(index + 1)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button size="sm" color="red" onClick={onClose}>
              Cancelar
            </Button>
            <Button size="sm" color="green" type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

AdminProductForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default AdminProductForm;
