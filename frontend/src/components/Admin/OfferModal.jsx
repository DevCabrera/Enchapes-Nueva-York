import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Input, Select, Option, Typography, Card } from "@material-tailwind/react";
import { createOffer, updateOffer } from "../../../Client/Services/offersServices";
import formatPriceCLP from "../../../Client/helpers/helperMoney";

const OfferModal = ({ isOpen, onClose, product, offer, onSave }) => {
  console.log("Producto en OfferModal:", product); 

  // Estado para manejar los datos del formulario
  const [localFormData, setLocalFormData] = useState({
    id_producto: product?.id_producto || "", // Asegúrate de que el id_producto esté presente
    porcentaje_descuento: offer ? offer.porcentaje_descuento : 0,
    fecha_inicio: offer ? offer.fecha_inicio : "",
    fecha_fin: offer ? offer.fecha_fin : "",
  });

  // Actualiza el estado cuando el producto o la oferta cambien
  useEffect(() => {
    if (product) {
      setLocalFormData((prevData) => ({
        ...prevData,
        id_producto: product.id_producto,
      }));
    }
  }, [product]);

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Maneja cambios en el porcentaje de descuento
  const handleDiscountChange = (value) => {
    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      porcentaje_descuento: Number(value), // Convierte el valor a número
    }));
  };

  // Envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedOffer;
      if (offer) {
        // Si hay una oferta existente, actualízala
        savedOffer = await updateOffer(offer.id_oferta, localFormData);
      } else {
        // Si no hay oferta existente, crea una nueva
        savedOffer = await createOffer(localFormData);
      }
      onSave(savedOffer); // Llama a la función onSave con la oferta guardada
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al guardar la oferta:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error al guardar la oferta");
    }
  };

  // Calcula el precio con descuento
  const calculateDiscountedPrice = () => {
    if (!product) return "0.00";
    const discount = localFormData.porcentaje_descuento / 100;
    return (product.precio_m2 * (1 - discount)).toFixed(2);
  };

  // Si el modal no está abierto o no hay producto, no renderices nada
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" className="mb-4">
            {offer ? "Editar Oferta" : "Agregar Oferta"}
          </Typography>

          {/* Campo: Porcentaje de Descuento */}
          <label className="block text-gray-700">Porcentaje de Descuento</label>
          <Select
            value={localFormData.porcentaje_descuento.toString()} // Convertir a string
            onChange={(value) => handleDiscountChange(value)} // Pasar el valor como string
            className="w-full mb-4"
          >
            {[...Array(21).keys()].map((i) => (
              <Option key={i} value={(i * 5).toString()}> {/* Convertir a string */}
                {i * 5}%
              </Option>
            ))}
          </Select>

          {/* Campo: Fecha de Inicio */}
          <label className="block text-gray-700">Fecha de Inicio</label>
          <Input
            type="date"
            name="fecha_inicio"
            value={localFormData.fecha_inicio}
            onChange={handleChange}
            className="w-full mb-4"
            required
          />

          {/* Campo: Fecha de Fin */}
          <label className="block text-gray-700">Fecha de Fin</label>
          <Input
            type="date"
            name="fecha_fin"
            value={localFormData.fecha_fin}
            onChange={handleChange}
            className="w-full mb-4"
            required
          />

          {/* Precio Anterior y Precio con Descuento */}
          <Card className="p-4 mb-4">
            <Typography variant="h6" className="mb-2">
              Precio Anterior: {formatPriceCLP(product.precio_m2)}
            </Typography>
            <Typography variant="h6" className="mb-2">
              Precio con Descuento: {formatPriceCLP(calculateDiscountedPrice())}
            </Typography>
          </Card>

          {/* Botones: Cancelar y Guardar */}
          <div className="flex justify-end mt-4">
            <Button size="sm" color="red" onClick={onClose}>
              Cancelar
            </Button>
            <Button size="sm" color="green" type="submit" className="ml-2">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Propiedades esperadas por el componente
OfferModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  offer: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default OfferModal;