import { useLocation } from "react-router-dom";
import UploadPayment from "../Cart/Payment";

const PaymentGene = () => {
  const location = useLocation();
  const { idCarro } = location.state || {};

  if (!idCarro) {
    console.error("ID del carrito no encontrado en el estado.");
    return <p>No tienes un carrito activo para realizar el pago.</p>;
  }

  console.log("ID del Carrito:", idCarro);
  return <UploadPayment idCarro={idCarro} />;
};

export default PaymentGene;
