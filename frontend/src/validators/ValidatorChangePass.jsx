export const validateChangePass = (formData) => {
  const errors = {};

  // Validar longitud de la nueva contraseña
  if (formData.newPassword.length < 6 || formData.newPassword.length > 16) {
    errors.newPassword =
      "La nueva contraseña debe tener entre 6 y 16 caracteres.";
  }

  // Validar que las contraseñas coincidan
  if (formData.newPassword !== formData.confirmPassword) {
    errors.confirmPassword = "Las nuevas contraseñas no coinciden.";
  }

  return errors;
};
