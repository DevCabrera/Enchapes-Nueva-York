import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// Helpers y contextos
import ErrorGlobals from "../Client/ErrorHandler/errorGlobals";
import { AuthProvider } from "../Client/Context/AuthProvider";
import CartProvider from "../Client/Context/CartProvider";
import { ProtectedRoute } from "../Client/Routes/ProtectedRoutes";
// Componentes generales
import Footer from "./components/general/Footer";
import Navbart from "./components/general/Navbar";
import Home from "./components/general/Home";
import Gallery from "./components/general/Gallery";
import Contact from "./components/specifics/Contact";
import Carouselw from "./components/general/Carrusel";
// Productos
import AllProducts from "./components/product/AllProducts";
import Product from "./components/product/Product";
import CartDetails from "./components/Cart/CartDetails";
// Administración
import Administration from "./components/Admin/Administration";
import PaymentAdministration from "./components/Admin/PaymentAdministration";
// Cuenta/Perfil
import Account from "./components/account/Account";
import LoginModal from "./components/login/loginModal";
import GoogleSign from "./components/login/GoogleSign";
// Pedidos
import OrderClient from "./components/Orders/OrderClient";
import PaymentGene from "./components/specifics/PaymentGene";
import GalleryAdmin from "./components/Admin/GalleryAdmin";
import ProductAdm from "./components/Admin/ProductAdm";
import Wsp from "./components/general/Wsp";

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
        <Route
          path="/products"
          element={
            <>
              <Carouselw />
              <AllProducts />
            </>
          }
        />
        <Route path="/products/:sku" element={<Product />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/login" element={<GoogleSign />} />

        {/* Rutas protegidas */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute requiredRole={2}>
              <PaymentGene />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute requiredRole={1}>
              <GalleryAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute requiredRole={2}>
              <OrderClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-administration"
          element={
            <ProtectedRoute requiredRole={1}>
              <PaymentAdministration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administration"
          element={
            <ProtectedRoute requiredRole={1}>
              <Administration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredRole={1}>
              <ProductAdm />
            </ProtectedRoute>
          }
        />
        <Route path="/account" element={<Account />} />
      </Routes>
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Wsp />
      <Footer />
      
    </>
  );
}

export default App;
