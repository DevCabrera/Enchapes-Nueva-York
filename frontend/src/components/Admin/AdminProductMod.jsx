import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updateProduct } from "../../../Client/Services/productServices";
import { Button } from "@material-tailwind/react";

const AdminProductMod = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    sku: "",
    nombre: "",
    ancho: "",
    alto: "",
    espesor: "",
    peso_m2: "",
    precio_m2: "",
    foto: null,
  });

  useEffect(() => {
    if (product) {
      setFormData((prevFormData) => ({ ...prevFormData, ...product }));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const savedProduct = await updateProduct(product.id_producto, formData);
      onSave(savedProduct);
      onClose();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit}>
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
          <label className="block text-gray-700">Foto</label>
          <input
            type="file"
            name="foto"
            onChange={handleChange}
            className="w-full mb-4 p-2"
          />
          {formData.foto && (
            <div className="w-full mb-4">
              <img
                src={
                  typeof formData.foto === "string"
                    ? formData.foto
                    : URL.createObjectURL(formData.foto)
                }
                alt="Producto"
                className="w-full h-32 object-cover rounded"
              />
              <Button
                size="sm"
                color="red"
                onClick={() => setFormData({ ...formData, foto: null })}
                className="mt-2"
              >
                Eliminar Foto
              </Button>
            </div>
          )}
          <div className="flex justify-end">
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

AdminProductMod.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AdminProductMod;
