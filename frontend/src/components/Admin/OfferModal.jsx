import { useState, useEffect } from "react";
import { createOffer } from "../../../Client/Services/offersServices";
import { Modal, Button, Typography, Select, Option } from "@material-tailwind/react";
import PropTypes from "prop-types";

const OfferModal = ({ isOpen, onClose, product }) => {
  const [discount, setDiscount] = useState(5); // Comienza en 5%
  const [newPrice, setNewPrice] = useState(0);

  useEffect(() => {
    if (product && product.precio_m2) {
      setNewPrice(product.precio_m2);
    }
  }, [product]);

  const discountOptions = [5, 10, 15, 20, 25, 30, 40, 50];

  const handleDiscountChange = (e) => {
    const discountValue = parseInt(e.target.value);
    setDiscount(discountValue);
    setNewPrice(
      ((product?.precio_m2 || 0) * (1 - discountValue / 100)).toFixed(2)
    );
  };

  const handleApplyOffer = async () => {
    if (!product || !product.id_producto) {
      console.error("Producto no válido");
      return;
    }

    try {
      const offerData = {
        id_producto: product.id_producto,
        precio_oferta: newPrice,
        porcentaje_descuento: discount,
      };
      await createOffer(offerData);
      onClose();
    } catch (error) {
      console.error("Error al crear oferta:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="p-6">
        <Typography variant="h5" className="mb-4">
          Agregar Oferta
        </Typography>
        <div className="mb-4">
          <Typography variant="subtitle1">Descuento:</Typography>
          <Select value={discount} onChange={handleDiscountChange}>
            {discountOptions.map((option) => (
              <Option key={option} value={option}>
                {option}%
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <Typography variant="subtitle1">Nuevo Precio:</Typography>
          <Typography variant="body1">${newPrice}</Typography>
        </div>
        <Button color="green" onClick={handleApplyOffer}>
          Aplicar Oferta
        </Button>
      </div>
    </Modal>
  );
};

OfferModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id_producto: PropTypes.number.isRequired,
    precio_m2: PropTypes.number.isRequired,
  }),
};

export default OfferModal;
