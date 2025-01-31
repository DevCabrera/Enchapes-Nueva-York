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
    <div className="gap-10 mt-10">
      <Tabs id="custom-animation" value="personalInfo" className="">
        <TabsHeader className="">
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value} className="w-full bg-[#c95a0033]">
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { x: 250 },
            mount: { x: 0 },
            unmount: { x: 250 },
          }}
        >
          {data.map(({ value, component }) => (
            <TabPanel key={value} value={value}>
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Account;
