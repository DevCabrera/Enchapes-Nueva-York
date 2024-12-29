import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const clientId =
  "604683012187-9kiqb2jqmp63cb8gptqta2tgne96lr4b.apps.googleusercontent.com";

const GoogleSign = () => {
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
    } catch (error) {
      console.error("Error al enviar token al backend:", error);
    }
  };

  const onFailure = (error) => {
    console.error("Error al iniciar sesión con Google:", error);
  };

  return (
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
  );
};

export default GoogleSign;
