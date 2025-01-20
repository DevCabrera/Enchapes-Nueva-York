import { useEffect, useState } from "react";
import { useAuth } from "../../../Client/Context/AuthProvider";
import {
  getPayments,
  verifyPayment,
  rejectPayment,
} from "../../../Client/Services/paymentServices";
import { Typography, Select, Option, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const PaymentAdministration = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [filterEmail, setFilterEmail] = useState(""); // Filtro por correo
  const [filterState, setFilterState] = useState("todos"); // Filtro por estado
  const [modalImage, setModalImage] = useState(null); // Imagen ampliada

  // Redirige a usuarios no autorizados
  useEffect(() => {
    if (!loading && (!user || user.id_tipo_usuario !== 1)) {
      navigate("/"); // Redirigir si no es administrador
    } else if (user?.id_tipo_usuario === 1) {
      const fetchPayments = async () => {
        try {
          const data = await getPayments();
          setPayments(data);
        } catch (error) {
          console.error("Error al obtener los pagos:", error);
        } finally {
          setLoadingPayments(false);
        }
      };
      fetchPayments();
    }
  }, [user, loading, navigate]);

  // Actualizar el estado del pago
  const handleStateChange = async (idPago, newState) => {
    try {
      if (newState === "verificado") {
        await verifyPayment(idPago);
      } else if (newState === "rechazado") {
        await rejectPayment(idPago);
      }
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id_pago === idPago
            ? { ...payment, estado: newState }
            : payment
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado del pago:", error);
    }
  };

  // Filtrar pagos por correo y estado
  const filteredPayments = payments.filter((payment) => {
    const matchesEmail = payment.carro?.email
      .toLowerCase()
      .includes(filterEmail.toLowerCase());
    const matchesState =
      filterState === "todos" || payment.estado === filterState;
    return matchesEmail && matchesState;
  });

  // Manejo de carga
  if (loading || loadingPayments) {
    return <Typography variant="h5">Cargando...</Typography>;
  }

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        Administración de Pagos
      </Typography>
      {/* Filtros */}
      <Typography variant="h4" className="mb-4">
        Buscar por Correo:
      </Typography>
      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          type="text"
          placeholder="Buscar por correo electrónico"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          className="w-64 text-black truncate max-w-md"
        />
        <Select
          value={filterState}
          onChange={(value) => setFilterState(value)}
          className="w-64"
        >
          <Option value="todos">Todos</Option>
          <Option value="pendiente">Pendiente</Option>
          <Option value="verificado">Verificado</Option>
          <Option value="rechazado">Rechazado</Option>
        </Select>
      </div>
      {/* Tabla de Pagos */}
      {filteredPayments.length === 0 ? (
        <Typography variant="h5">No hay pagos que coincidan.</Typography>
      ) : (
        <div className="overflow-auto">
          <table className="table-auto border-collapse w-full text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">Correo</th>
                <th className="border px-4 py-2">Estado Actual</th>
                <th className="border px-4 py-2">Productos</th>
                <th className="border px-4 py-2">Comprobante</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id_pago}>
                  <td className="border px-4 py-2">
                    {payment.carro?.email || "Sin correo"}
                  </td>
                  <td className="border px-4 py-2">{payment.estado}</td>
                  <td className="border px-4 py-2">
                    <ul>
                      {payment.carro?.productos.map((prod) => (
                        <li key={prod.id_producto}>{prod.producto.nombre}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">
                    <img
                      src={payment.comprobante}
                      alt="Comprobante"
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => setModalImage(payment.comprobante)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Select
                      value={payment.estado}
                      onChange={(newState) =>
                        handleStateChange(payment.id_pago, newState)
                      }
                      className="w-full"
                    >
                      <Option value="pendiente">Pendiente</Option>
                      <Option value="verificado">Verificado</Option>
                      <Option value="rechazado">Rechazado</Option>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal para Imagen Ampliada */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Comprobante Ampliado"
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentAdministration;
