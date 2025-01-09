import React, { useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  LockClosedIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Client/Context/AuthProvider"; // Ajusta la ruta según tu estructura
import PersonalInfo from "./PersonalInfo";
import ChangePass from "./ChangePass";
import AddressClient from "./AddressClient";

const Account = () => {
  const { user } = useAuth(); // Obtener el usuario del contexto
  const navigate = useNavigate();

  // Redirigir al home si el usuario no está autenticado
  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirigir al home
    }
  }, [user, navigate]);

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
  ];

  // Mostrar un mensaje de carga o componente vacío mientras verifica el estado de `user`
  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row">
      <Tabs
        value="personalInfo"
        orientation="vertical"
        className="w-full md:w-auto"
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
        <TabsBody>
          {data.map(({ value, component }) => (
            <TabPanel key={value} value={value} className="py-4">
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Account;
