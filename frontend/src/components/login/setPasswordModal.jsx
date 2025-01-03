import { useState } from "react";
import Modal from "react-modal"; // Asegúrate de tener react-modal instalado: npm install react-modal
import PropTypes from "prop-types";
import axios from "axios";

const SetPasswordModal = ({ isOpen, onRequestClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3005/api/auth/set-password",
        { password }
      );
      setMessage("Contraseña establecida exitosamente");
      console.log("Respuesta del backend:", response.data);
      onRequestClose(); // Cerrar el modal después de establecer la contraseña
    } catch (error) {
      setMessage("Error al establecer la contraseña");
      console.error("Error del backend:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Establecer Contraseña"
    >
      <h1>Establecer Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirmar Contraseña:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Establecer Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </Modal>
  );
};

SetPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default SetPasswordModal;
