import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uploadPayment } from "../../../Client/Services/paymentServices";
import { getDirecciones } from "../../../Client/Services/userServices";
import { useAuth } from "../../../Client/Context/AuthProvider";
import { Button, Input, Typography } from "@material-tailwind/react";

const UploadPayment = ({ idCarro }) => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const [comprobante, setComprobante] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [direcciones, setDirecciones] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState(null);

  // Cargar direcciones al montar el componente
  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const data = await getDirecciones(user.email);
        setDirecciones(data);
        // Seleccionar automáticamente la dirección favorita
        const favorita = data.find((dir) => dir.favorita);
        if (favorita) {
          setSelectedDireccion(favorita.id_direccion);
        }
      } catch (error) {
        console.error("Error al obtener direcciones:", error);
      }
    };
    if (user) {
      fetchDirecciones();
    }
  }, [user]);

  const handleFileChange = (e) => {
    setComprobante(e.target.files[0]);
  };

  const handleDireccionChange = (id) => {
    setSelectedDireccion(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comprobante) {
      setMessage("Por favor selecciona un archivo.");
      return;
    }
    if (!selectedDireccion) {
      setMessage("Por favor selecciona una dirección.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id_carro", idCarro);
      formData.append("id_direccion", selectedDireccion);
      formData.append("comprobante", comprobante);
      console.log("que soy", idCarro, selectedDireccion, comprobante);
      const response = await uploadPayment(formData);
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
      <Typography variant="h5" color="blue-gray" className="mb-4">
        Subir Comprobante de Pago
      </Typography>
      {/* Selección de dirección */}
      <div>
        <Typography variant="small" color="blue-gray" className="mb-2">
          Selecciona una dirección para la entrega:
        </Typography>
        {direcciones.length > 0 ? (
          <div className="space-y-2">
            {direcciones.map((dir) => (
              <div key={dir.id_direccion} className="flex items-center">
                <input
                  type="radio"
                  name="direccion"
                  value={dir.id_direccion}
                  checked={selectedDireccion === dir.id_direccion}
                  onChange={() => handleDireccionChange(dir.id_direccion)}
                  className="mr-2"
                />
                <Typography>{dir.direccion}</Typography>
              </div>
            ))}
          </div>
        ) : (
          <Typography color="red" className="mt-2">
            No tienes direcciones registradas. Por favor agrega una dirección en
            tu perfil.
          </Typography>
        )}
      </div>
      {/* Subir comprobante */}
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
          disabled={loading || !selectedDireccion}
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
