import { useEffect, useState } from "react";
import { useAuth } from "../../../Client/Context/AuthProvider";
import { getPayments } from "../../../Client/Services/paymentServices";
import { Card, Typography } from "@material-tailwind/react";
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

  const TABLE_HEAD = [
    "Estado",
    "Dirección a Enviar",
    "Productos",
    "Total",
    "Comprobante",
  ];

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        Mis Pedidos
      </Typography>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const isLast = index === orders.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={order.id_pago}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.estado}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.direccion?.direccion || "Sin dirección"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <ul>
                      {order.detalles.map((detalle) => (
                        <li key={detalle.id_producto}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {detalle.producto.nombre} - {detalle.cantidad} M²
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className={`${classes} font-bold`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatPriceCLP(order.total)}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <img
                      src={order.comprobante}
                      alt="Comprobante"
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => window.open(order.comprobante, "_blank")}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default OrderClient;
