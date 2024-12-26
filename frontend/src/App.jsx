import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/general/Footer";
import Navbart from "./components/general/Navbar";
import Carouselw from "./components/general/Carrusel";
import Expoir from "./components/general/Expo";
import Gallery from "./components/general/Gallery";
import AboutUs from "./components/general/AboutUs";
import IdeasHome from "./components/general/IdeasHome";
import Contact from "./components/specifics/Contact";
import HomeProducts from "./components/specifics/HomeProducts";
import Product from "./components/product/Product";
import LoginModal from "./components/specifics/loginModal";
import Account from "./components/account/Account";
import AllProducts from "./components/product/AllProducts";

import { AuthProvider, useAuth } from "../Client/Context/AuthProvider";
import PropTypes from "prop-types";

// Configuración principal de la aplicación
function App() {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
}

// Componente que contiene la lógica principal
function MainContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Control del modal de login
  const { loginUser, user } = useAuth(); // Contexto de autenticación

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
        <button onClick={logoutUser}>Cerrar Sesión</button>
      ) : (
        <button onClick={() => setIsLoginOpen(true)}>Iniciar Sesión</button>
      )}
    </>
  );
}

// Validación de PropTypes para Home
Home.propTypes = { setIsLoginOpen: PropTypes.func.isRequired };

export default App;
