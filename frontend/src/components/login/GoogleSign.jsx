import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import SetPasswordModal from "./setPasswordModal";

const clientId =
  "604683012187-9kiqb2jqmp63cb8gptqta2tgne96lr4b.apps.googleusercontent.com";

const GoogleSign = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSuccess = async (response) => {
    console.log("Login exitoso:", response);
    try {
      const { data } = await axios.post(
        "http://localhost:3005/api/auth/google",
        {
          tokenId: response.credential,
        }
      );
      console.log("Respuesta del backend:", data);

      if (data.newUser) {
        setIsModalOpen(true); // Abrir el modal para establecer la contraseña
      }
    } catch (error) {
      console.error("Error al enviar token al backend:", error);
      console.error(
        "Detalles del error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const onFailure = (error) => {
    console.error("Error al iniciar sesión con Google:", error);
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          text="Iniciar sesión con Google"
          shape="round"
          logo_alignment="left"
          width="300"
          locale="es"
          click_listener={() => console.log("Clicked")}
        />
      </GoogleOAuthProvider>

      <SetPasswordModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default GoogleSign;
