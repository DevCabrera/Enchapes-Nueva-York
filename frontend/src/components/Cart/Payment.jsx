import { useState } from "react";
import PropTypes from "prop-types";
import { uploadPayment } from "../../../Client/Services/paymentServices";
import { Button, Input, Typography } from "@material-tailwind/react";

const UploadPayment = ({ idCarro }) => {
  const [comprobante, setComprobante] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleFileChange = (e) => {
    setComprobante(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comprobante) {
      setMessage("Por favor selecciona un archivo.");
      return;
    }
    setLoading(true);
    try {
      const response = await uploadPayment(idCarro, comprobante);
      setMessage(response.message || "Comprobante subido correctamente.");
    } catch (error) {
      console.error("Error al subir el comprobante:", error);
      setMessage("Error al subir el comprobante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <Typography variant="h5" color="blue-gray">
        Subir Comprobante de Pago
      </Typography>
      <form onSubmit={handleSubmit} className="mt-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="mb-4"
        />
        <Button
          type="submit"
          color="green"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Subiendo..." : "Subir Comprobante"}
        </Button>
      </form>
      {message && (
        <Typography variant="small" color="red" className="mt-4">
          {message}
        </Typography>
      )}
    </div>
  );
};

UploadPayment.propTypes = {
  idCarro: PropTypes.number.isRequired,
};

export default UploadPayment;
