import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <MainContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function MainContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, loginUser, loading } = useAuth(); // Añadido `loading` para controlar la carga inicial.

  // Rutas protegidas para administrar permisos de acceso
  const ProtectedRoute = ({ children }) => {
    if (loading) return null; // Renderizar nada mientras se verifica la autenticación.
    return user && user.id_tipo_usuario === 1 ? children : <Navigate to="/" />;
  };

  ProtectedRoute.propTypes = {
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
        <Route
          path="/administration"
          element={
            <ProtectedRoute>
              <Administration />
            </ProtectedRoute>
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

function Home({ setIsLoginOpen }) {
  const { user, logoutUser } = useAuth();

  return (
    <>
      <HomeProducts />
      <AboutUs />
      <IdeasHome />
      <Expoir />
      {user ? (
        <button
          onClick={logoutUser}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar Sesión
        </button>
      ) : (
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Iniciar Sesión
        </button>
      )}
    </>
  );
}

Home.propTypes = { setIsLoginOpen: PropTypes.func.isRequired };

export default App;
