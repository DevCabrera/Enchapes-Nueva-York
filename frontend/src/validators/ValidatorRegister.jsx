export const validateRegisterFields = (formData) => {
  const newErrors = {};

  // Validación del email
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email inválido.";
  }

  // Validación del nombre
  if (!formData.firstName || formData.firstName.length < 3) {
    newErrors.firstName =
      "El nombre es obligatorio y debe tener al menos 3 caracteres.";
  }

  // Validación del apellido
  if (!formData.lastName || formData.lastName.length < 3) {
    newErrors.lastName =
      "El apellido es obligatorio y debe tener al menos 3 caracteres.";
  }

  // Validación de la contraseña
  if (!formData.password || formData.password.length < 6) {
    newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
  } else if (formData.password.length > 16) {
    newErrors.password = "La contraseña no puede superar los 16 caracteres.";
  }

  // Validación de la confirmación de la contraseña
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Las contraseñas no coinciden.";
  }

  // Validación del celular
  const celularRegex = /^\+569\d{8}$/; // Formato: +569 seguido de 8 dígitos
  if (!formData.phone || !celularRegex.test(`+56${formData.phone}`)) {
    newErrors.phone =
      "El celular debe tener el formato +569 seguido de 8 dígitos.";
  }

  return newErrors;
};
