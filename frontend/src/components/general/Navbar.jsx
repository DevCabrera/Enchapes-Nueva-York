import { Link } from "react-router-dom";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useAuth } from "../../../Client/Context/AuthProvider";

export default function Navbart({ setOpenModal }) {
  const [openNav, setOpenNav] = useState(false);
  const { user, logoutUser } = useAuth(); // Obtener usuario y función de logout

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal text-white"
      >
        <Link to="/gallery" className="flex items-center hover:text-[#E67E22]">
          Galería
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal text-white"
      >
        <Link to="/product" className="flex items-center hover:text-[#E67E22]">
          Bloques
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal text-white"
      >
        <Link to="/Contact" className="flex items-center hover:text-[#E67E22]">
          Contáctanos
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar
      className="max-w-full bg-[#B22222] top-0"
      style={{ border: "0px", borderRadius: "0px" }}
    >
      <div className="flex items-center justify-between text-white">
        <Link to="/">
          <Typography
            as="a"
            href="#"
            className="mr-6 cursor-pointer py-1.5 font-serif text-white text-2xl"
          >
            Enchapes Nueva York
          </Typography>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {user ? (
              <>
                <Button
                  variant="outlined"
                  size="sm"
                  className="text-white border-white"
                >
                  Mi Cuenta
                </Button>
                <IconButton onClick={logoutUser} className="text-white">
                  Cerrar Sesión
                </IconButton>
              </>
            ) : (
              <Button
                variant="outlined"
                size="sm"
                className="text-white border-white"
                onClick={() => setOpenModal(true)}
              >
                Iniciar Sesión
              </Button>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-white hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
}

// Validación de PropTypes
Navbart.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};
