import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ShoppingCartIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../Client/Context/AuthProvider";

export default function Navbart({ setOpenModal }) {
  const [openNav, setOpenNav] = useState(false);
  const { user, logoutUser } = useAuth(); // Contexto de autenticación
  const navigate = useNavigate(); // Hook de navegación

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

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
        <Link to="/products" className="flex items-center hover:text-[#E67E22]">
          Revestimientos
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-1 font-normal text-white"
      >
        <Link to="/contact" className="flex items-center hover:text-[#E67E22]">
          Contáctanos
        </Link>
      </Typography>
      {user?.id_tipo_usuario === 1 && (
        <Typography
          as="li"
          variant="small"
          className="p-1 font-normal text-white"
        >
          <Link
            to="/administration"
            className="flex items-center hover:text-[#E67E22]"
          >
            Administración
          </Link>
        </Typography>
      )}
    </ul>
  );

  return (
    <Navbar
      className="max-w-full bg-[#353535] top-0"
      style={{ border: "0px", borderRadius: "0px" }}
    >
      <div className="flex items-center justify-between text-white">
        <Link to="/">
          <div className="flex items-center">
            <img
              src="src/img/Martillazo.png"
              alt="logo-ct"
              className="w-20"
            />
            <Typography
              as="a"
              href="#"
              className="mr-6 cursor-pointer py-1.5 font-serif text-white text-2xl"
            >
              Enchapes Nueva York
            </Typography>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {user ? (
              <>
                <Link to="/account">
                  <Typography
                    as="li"
                    variant="small"
                    className="p-1 font-normal text-white"
                  >
                    <Link
                      to="/account"
                      className="flex items-center hover:text-[#E67E22]"
                    >
                      Mi Cuenta
                    </Link>
                  </Typography>
                </Link>
                <Link to="/cart">
                  <ShoppingCartIcon className="h-6 w-6 hover:text-orange-600" />
                </Link>
                <ArrowRightOnRectangleIcon onClick={handleLogout} className="h-6 w-6 hover:text-orange-600 cursor-pointer" />
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
      <Collapse open={openNav}>{navList}</Collapse>
    </Navbar>
  );
}

Navbart.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};