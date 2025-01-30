import React, { useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  LockClosedIcon,
  MapPinIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Client/Context/AuthProvider"; // Ajusta la ruta según tu estructura
import PersonalInfo from "./PersonalInfo";
import ChangePass from "./ChangePass";
import AddressClient from "./AddressClient";
import OrderClient from "../Orders/OrderClient";

const Account = () => {
  const { user, loading } = useAuth(); // Obtener el usuario del contexto
  const navigate = useNavigate();

  // Redirigir al home si el usuario no está autenticado
  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // Redirigir solo si la verificación ha terminado y no hay usuario.
    }
  }, [loading, user, navigate]);

  const data = [
    {
      label: "Datos personales",
      value: "personalInfo",
      icon: UserCircleIcon,
      component: <PersonalInfo />,
    },
    {
      label: "Cambio de contraseña",
      value: "changePass",
      icon: LockClosedIcon,
      component: <ChangePass />,
    },
    {
      label: "Direcciones",
      value: "address",
      icon: MapPinIcon,
      component: <AddressClient />,
    },
    {
      label: "Mis Compras",
      value: "orders",
      icon: ShoppingBagIcon,
      component: <OrderClient />,
    },
  ];

  // Mostrar un mensaje de carga o componente vacío mientras verifica el estado de `user`
  if (loading) {
    return <Typography variant="h5">Cargando...</Typography>;
  }

  return (
    <div className="flex flex-col md:flex-row mt-6 ml-6 min-h-screen">
      <Tabs
        value="personalInfo"
        orientation="vertical"
        className="flex-1 md:flex"
      >
        {/* Sidebar */}
        <TabsHeader className="w-48">
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value} className="place-items-start">
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>

        {/* Contenido */}
        <TabsBody className="">
          {data.map(({ value, component }) => (
            <TabPanel key={value} value={value} className="py-4 h-full">
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Account;
