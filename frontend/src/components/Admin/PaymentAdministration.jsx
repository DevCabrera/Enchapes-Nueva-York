import { useEffect, useState } from "react";
import { useAuth } from "../../../Client/Context/AuthProvider";
import {
  getPayments,
  verifyPayment,
  rejectPayment,
} from "../../../Client/Services/paymentServices";
import { Typography, Select, Option, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import formatPriceCLP from "../../../Client/helpers/helperMoney";
const PaymentAdministration = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [filterEmail, setFilterEmail] = useState("");
  const [filterState, setFilterState] = useState("todos");
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!loading && (!user || user.id_tipo_usuario !== 1)) {
      navigate("/");
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

  const handleStateChange = async (idPago, newState) => {
    try {
      if (newState === "verificado") await verifyPayment(idPago);
      else if (newState === "rechazado") await rejectPayment(idPago);

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

  const getSelectClass = (estado) => {
    switch (estado) {
      case "pendiente":
        return { className: "bg-blue-gray-400", icon: null };
      case "verificado":
        return {
          className: "bg-green-200",
          icon: <CheckIcon className="w-5 h-5 inline mr-2" />,
        };
      case "rechazado":
        return {
          className: "bg-red-200",
          icon: <XMarkIcon className="w-5 h-5 inline mr-2" />,
        };
      default:
        return { className: "", icon: null };
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesEmail = payment.carro?.email
      ?.toLowerCase()
      .includes(filterEmail.toLowerCase());

    const matchesState =
      filterState === "todos" || payment.estado === filterState;
    return matchesEmail && matchesState;
  });

  if (loading || loadingPayments)
    return <Typography variant="h5">Cargando...</Typography>;

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        Administración de Pagos
      </Typography>
      <div className="flex flex-wrap gap-4 mb-4 max-w-full">
        <div>
          <Input
            type="text"
            placeholder="Buscar por correo electrónico"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            className="min-w-[250px] placeholder-black text-black"
          />
        </div>
        <div className="">
          <Select
            value={filterState}
            onChange={(value) => setFilterState(value)}
            className="min-w-[200px]"
          >
            <Option value="todos">Todos</Option>
            <Option value="pendiente">Pendiente</Option>
            <Option value="verificado">Verificado</Option>
            <Option value="rechazado">Rechazado</Option>
          </Select>
        </div>
      </div>
      {filteredPayments.length === 0 ? (
        <Typography variant="h5">No hay pagos que coincidan.</Typography>
      ) : (
        <div className="overflow-auto">
          <table className="table-auto border-collapse w-full text-left">
            <thead>
              <tr className="border-black">
                <th className="border border-black px-4 py-2">Correo</th>
                <th className="border border-black px-4 py-2">Estado Actual</th>
                <th className="border border-black px-4 py-2">Productos</th>
                <th className="border border-black px-4 py-2">Dirección</th>
                <th className="border border-black px-4 py-2">Total</th>{" "}
                <th className="border border-black px-4 py-2">Comprobante</th>
                <th className="border border-black px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => {
                const { className, icon } = getSelectClass(payment.estado);
                return (
                  <tr key={payment.id_pago} className="border-black">
                    <td className="border border-black px-4 py-2">
                      {payment.carro?.email}
                    </td>
                    <td className="border border-black px-4 py-2">
                      {payment.estado}
                    </td>
                    <td className="border border-black px-4 py-2">
                      <ul>
                        {payment.detalles.map((detalle) => (
                          <li key={detalle.id_producto}>
                            {detalle.producto.nombre} - {detalle.cantidad}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-black px-4 py-2">
                      {payment.direccion?.direccion || "Sin dirección"}
                    </td>
                    <td className="border border-black px-4 py-2 font-bold">
                      {formatPriceCLP(payment.total)}
                    </td>
                    <td className="border border-black px-4 py-2">
                      <img
                        src={payment.comprobante}
                        alt="Comprobante"
                        className="w-16 h-16 object-cover cursor-pointer"
                        onClick={() => setModalImage(payment.comprobante)}
                      />
                    </td>
                    <td className="border border-black px-4 py-2">
                      <Select
                        value={payment.estado}
                        onChange={(newState) =>
                          handleStateChange(payment.id_pago, newState)
                        }
                        className={`w-full gap-2 ${className}`}
                      >
                        <Option value="pendiente">Pendiente</Option>
                        <Option value="verificado" className="bg-green-100">
                          {icon} Verificado
                        </Option>
                        <Option value="rechazado">{icon} Rechazado</Option>
                      </Select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
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
