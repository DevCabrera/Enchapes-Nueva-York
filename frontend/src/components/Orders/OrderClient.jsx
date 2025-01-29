import { useEffect, useState } from "react";
import { useAuth } from "../../../Client/Context/AuthProvider";
import { getPayments } from "../../../Client/Services/paymentServices";
import { Typography } from "@material-tailwind/react";
import formatPriceCLP from "../../../Client/helpers/helperMoney";

const OrderClient = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      const fetchOrders = async () => {
        try {
          const data = await getPayments();
          const userOrders = data.filter(
            (order) => order.carro.email === user.email
          );

          setOrders(userOrders);
        } catch (error) {
          console.error("Error al obtener los pedidos:", error);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [user, loading]);

  if (loading || loadingOrders) {
    return <Typography variant="h5">Cargando pedidos...</Typography>;
  }

  if (!orders.length) {
    return <Typography variant="h5">No tienes pedidos realizados.</Typography>;
  }

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        Mis Pedidos
      </Typography>
      <div className="overflow-auto">
        <table className="table-auto border-collapse w-full text-left border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Estado</th>
              <th className="border border-black px-4 py-2">
                Dirección a Enviar
              </th>{" "}
              <th className="border border-black px-4 py-2">Productos</th>
              <th className="border border-black px-4 py-2">Total</th>
              <th className="border border-black px-4 py-2">Comprobante</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id_pago}>
                <td className="border border-black px-4 py-2">
                  {order.estado}
                </td>
                <td className="border border-black px-4 py-2">
                  {order.direccion?.direccion || "Sin dirección"}{" "}
                </td>
                <td className="border border-black px-4 py-2">
                  <ul>
                    {order.detalles.map((detalle) => (
                      <li key={detalle.id_producto}>
                        {detalle.producto.nombre} - {detalle.cantidad}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-black px-4 py-2 font-bold">
                  {formatPriceCLP(order.total)}
                </td>
                <td className="border border-black px-4 py-2">
                  <img
                    src={order.comprobante}
                    alt="Comprobante"
                    className="w-16 h-16 object-cover cursor-pointer"
                    onClick={() => window.open(order.comprobante, "_blank")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderClient;
