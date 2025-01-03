import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../Client/Context/AuthProvider";
import CartDrawer from "../Cart/cartDrawer";

export default function Navbart({ setOpenModal }) {
  const [openNav, setOpenNav] = useState(false);
  const { user, logoutUser } = useAuth();
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    return () => {
      window.removeEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    };
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
        <Link to="/products" className="flex items-center hover:text-[#E67E22]">
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
      {user && user.id_tipo_usuario === 1 && (
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

  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);

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
                <Link to="/account">
                  <Button
                    variant="outlined"
                    size="sm"
                    className="text-white border-white"
                  >
                    Mi Cuenta
                  </Button>
                </Link>
                <IconButton onClick={logoutUser} className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </IconButton>
                <IconButton onClick={handleOpenCart} className="text-white">
                  <ShoppingCartIcon className="h-6 w-6" />
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
      {user && (
        <CartDrawer
          open={openCart}
          onClose={handleCloseCart}
          token={user.token}
        />
      )}
    </Navbar>
  );
}

// Validación de PropTypes
Navbart.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};
