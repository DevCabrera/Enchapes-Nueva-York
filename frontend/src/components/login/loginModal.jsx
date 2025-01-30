import PropTypes from "prop-types";
import { useState } from "react";
import { useAuth } from "../../../Client/Context/AuthProvider.jsx";
import RegisterModal from "../specifics/RegisterModal.jsx";
import Swal from "sweetalert2";

const LoginModal = ({ open, onClose }) => {
  const { loginUser } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await loginUser(loginData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Inicio de sesión exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        error.response?.data?.message ||
          "Hubo un problema al iniciar sesión. Intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openRegisterModal = () => setIsRegisterOpen(true);

  const closeRegisterModal = () => setIsRegisterOpen(false);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg w-96 p-6 bg-gradient-to-tr from-[#6b7a96] to-[#FFFFFF]">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 float-right"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-center mb-4">
            Iniciar Sesión
          </h2>

          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                placeholder="Enchapes@gmail.com"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Contraseña:</label>
              <input
                placeholder="Ingresa tu Contraseña"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              className={`bg-[#2c4255] text-white px-4 py-2 w-full rounded-lg mt-2 hover:bg-[#3c5d7a] ${
                isSubmitting && "opacity-50 cursor-not-allowed"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>
          <hr className="my-3" />
          {/* <div className="mb-4">
            <GoogleSign />
          </div> */}
          <button
            onClick={openRegisterModal}
            className="bg-[#2c4255] text-white px-4 py-2 w-full rounded-lg mt-2 hover:bg-[#3c5d7a]"
          >
            Registrarse con un email
          </button>
        </div>
      </div>
      <RegisterModal open={isRegisterOpen} onClose={closeRegisterModal} />
    </>
  );
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
