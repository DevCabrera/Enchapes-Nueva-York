import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
// Componentes Generales:
import Footer from "./components/general/Footer";
import Navbart from "./components/general/Navbar";
import Carouselw from "./components/general/Carrusel";
import Expoir from "./components/general/Expo";
import Gallery from "./components/general/Gallery";
import AboutUs from "./components/general/AboutUs";
import IdeasHome from "./components/general/IdeasHome";
// Específicos para productos
import Contact from "./components/specifics/Contact";
import HomeProducts from "./components/specifics/HomeProducts";
import Product from "./components/product/Product";
import AllProducts from "./components/product/AllProducts";
import CartProvider from "../Client/Context/CartProvider";
// Componentes de login y cuenta/perfil:
import LoginModal from "./components/login/loginModal";
import Account from "./components/account/Account";
import { AuthProvider, useAuth } from "../Client/Context/AuthProvider";
// Componentes para administración:
import Administration from "./components/Admin/Administration";

import PropTypes from "prop-types";
import GoogleSign from "./components/login/GoogleSign";
import CartDetails from "./components/Cart/CartDetails";
import UploadPayment from "./components/Cart/Payment";
import OrderClient from "./components/Orders/OrderClient";
import PaymentAdministration from "./components/Admin/PaymentAdministration";
import ErrorGlobals from "../Client/ErrorHandler/errorGlobals";

function App() {
  return (
    <ErrorGlobals>
      <AuthProvider>
        <CartProvider>
          <Router>
            <MainContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorGlobals>
  );
}

function MainContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, loginUser, loading } = useAuth(); // Añadido `loading` para controlar la carga inicial.

  // Rutas protegidas para administrar permisos de acceso
  const ProtectedRoute = ({ children }) => {
    if (loading) return null;
    console.log("Cargando autenticación...");
    return user && user.id_tipo_usuario === 1 ? children : <Navigate to="/" />;
  };
  const ProtectedRoutePayment = ({ children }) => {
    if (loading) return null;
    console.log("Cargando autenticación...");
    return (user && user.id_tipo_usuario === 1) ||
      (user && user.id_tipo_usuario === 2) ? (
      children
    ) : (
      <Navigate to="/" />
    );
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  ProtectedRoutePayment.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <>
      <Navbart setOpenModal={setIsLoginOpen} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carouselw />
              <Home setIsLoginOpen={setIsLoginOpen} />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              <Carouselw />
              <Gallery />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Carouselw />
              <Contact />
            </>
          }
        />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:sku" element={<Product />} />
        <Route path="/login" element={<GoogleSign />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoutePayment>
              <Payment />
            </ProtectedRoutePayment>
          }
        />
        <Route
          path="/payment-administration"
          element={
            <ProtectedRoute>
              <PaymentAdministration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administration"
          element={
            <ProtectedRoute>
              <Administration />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoutePayment>
              <OrderClient />
            </ProtectedRoutePayment>
          }
        />

        <Route path="/account" element={<Account />} />
      </Routes>
      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={loginUser}
      />
      <Footer />
    </>
  );
}
function Payment() {
  const location = useLocation();
  const { idCarro } = location.state || {};

  if (!idCarro) {
    console.error("ID del carrito no encontrado en el estado.");
    return <p>No tienes un carrito activo para realizar el pago.</p>;
  }

  console.log("ID del Carrito:", idCarro);
  return <UploadPayment idCarro={idCarro} />;
}

function Home() {
  return (
    <>
      <HomeProducts />
      <AboutUs />
      <IdeasHome />
      <Expoir />
    </>
  );
}

Home.propTypes = { setIsLoginOpen: PropTypes.func.isRequired };

export default App;
