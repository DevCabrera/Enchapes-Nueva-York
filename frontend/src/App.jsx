import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//Componentes Generales:
import Footer from "./components/general/Footer";
import Navbart from "./components/general/Navbar";
import Carouselw from "./components/general/Carrusel";
import Expoir from "./components/general/Expo";
import Gallery from "./components/general/Gallery";
import AboutUs from "./components/general/AboutUs";
import IdeasHome from "./components/general/IdeasHome";
//Especificos para productos
import Contact from "./components/specifics/Contact";
import HomeProducts from "./components/specifics/HomeProducts";
import Product from "./components/product/Product";
import AllProducts from "./components/product/AllProducts";
import CartProvider from "../Client/Context/CartProvider";
//Componentes de login y cuenta/perfil:
import LoginModal from "./components/login/loginModal";
import Account from "./components/account/Account";
import { AuthProvider, useAuth } from "../Client/Context/AuthProvider";

//componentes para administracion:
import Administration from "./components/Admin/Administration";

import PropTypes from "prop-types";
import GoogleSign from "./components/login/GoogleSign";

// Configuración principal de la aplicación
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

// Componente que contiene la lógica principal
function MainContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Control del modal de login
  const { loginUser, user } = useAuth(); // Contexto de autenticación

  const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user && user.id_tipo_usuario === 1 ? children : <Navigate to="/" />;
  };
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <>
      <Navbart setOpenModal={setIsLoginOpen} user={user} />
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

      {/* Modal de login */}
      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={loginUser} // Función del contexto
      />

      <Footer />
    </>
  );
}

// Componente Home para la página principal
function Home({ setIsLoginOpen }) {
  const { user, logoutUser } = useAuth(); // Acceso al estado y logout

  return (
    <>
      <HomeProducts />
      <AboutUs />
      <IdeasHome />
      <Expoir />
      {/* Botones de Login/Logout */}
      {user ? (
        <button onClick={logoutUser}></button>
      ) : (
        <button onClick={() => setIsLoginOpen(true)}></button>
      )}
    </>
  );
}

// Validación de PropTypes para Home
Home.propTypes = { setIsLoginOpen: PropTypes.func.isRequired };

export default App;
