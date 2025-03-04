import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uploadPayment } from "../../../Client/Services/paymentServices";
import { getDirecciones } from "../../../Client/Services/userServices";
import { useAuth } from "../../../Client/Context/AuthProvider";
import { Button, Input, Typography, Card } from "@material-tailwind/react";
import { BanknotesIcon, UserIcon, CreditCardIcon, IdentificationIcon, MapPinIcon, ArrowUpTrayIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const UploadPayment = ({ idCarro }) => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const [comprobante, setComprobante] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [direcciones, setDirecciones] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState(null);

  // Información de la cuenta bancaria
  const cuentaBancaria = {
    banco: "Banco Falabella",
    titular: "Diego LLancao",
    numeroCuenta: "1-584-167938-0",
    tipoCuenta: "Cuenta Corriente",
    rut: "19.681.845-6",
    email: "enchapesnewyork@gmail.com",
  };

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
    <div className="p-6">
      <Typography variant="h4" color="blue-gray" className="mb-4">
        Subir Comprobante de Pago
      </Typography>
      <Card className="p-4 mb-4">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Información de la Cuenta Bancaria
        </Typography>
        <Typography variant="small" color="blue-gray" className="flex items-center">
          <BanknotesIcon className="w-5 h-5 mr-2" />
          <strong>Banco:</strong> {cuentaBancaria.banco}
        </Typography>
        <Typography variant="small" color="blue-gray" className="flex items-center">
          <UserIcon className="w-5 h-5 mr-2" />
          <strong>Titular:</strong> {cuentaBancaria.titular}
        </Typography>
        <Typography variant="small" color="blue-gray" className="flex items-center">
          <CreditCardIcon className="w-5 h-5 mr-2" />
          <strong>Número de Cuenta:</strong> {cuentaBancaria.numeroCuenta}
        </Typography>
        <Typography variant="small" color="blue-gray" className="flex items-center">
          <CreditCardIcon className="w-5 h-5 mr-2" />
          <strong>Tipo de Cuenta:</strong> {cuentaBancaria.tipoCuenta}
        </Typography>
        <Typography variant="small" color="blue-gray" className="flex items-center">
          <IdentificationIcon className="w-5 h-5 mr-2" />
          <strong>RUT:</strong> {cuentaBancaria.rut}
        </Typography>
        <Typography variant="small" color="blue-gray" className="flex items-center">
          <EnvelopeIcon className="w-5 h-5 mr-2" />
          <strong>Email:</strong> {cuentaBancaria.email}
        </Typography>
      </Card>
      <Card className="p-4 mb-4">
        <Typography variant="h5" color="blue-gray" className="mb-2">
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
                <Typography className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  {dir.direccion}
                </Typography>
              </div>
            ))}
          </div>
        ) : (
          <Typography color="red" className="mt-2">
            No tienes direcciones registradas. Por favor agrega una dirección en
            tu perfil.
          </Typography>
        )}
      </Card>
      <Card className="p-4">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Subir Comprobante
          </Typography>
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
            className="w-full flex items-center justify-center"
          >
            {loading ? (
              "Subiendo..."
            ) : (
              <>
                <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                Subir Comprobante
              </>
            )}
          </Button>
        </form>
        {message && (
          <Typography variant="small" color="red" className="mt-4">
            {message}
          </Typography>
        )}
      </Card>
    </div>
  );
};

UploadPayment.propTypes = {
  idCarro: PropTypes.number.isRequired,
};

export default UploadPayment;