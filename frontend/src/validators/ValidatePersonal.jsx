export const validatePersonalFields = (formData) => {
  const newErrors = {};

  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email inválido.";
  }
  // Validación del nombre
  if (!formData.nombre || formData.nombre.length < 3) {
    newErrors.nombre =
      "El nombre es obligatorio y debe tener al menos 3 caracteres.";
  }

  // Validación del apellido
  if (!formData.apellido || formData.apellido.length < 3) {
    newErrors.apellido =
      "El apellido es obligatorio y debe tener al menos 3 caracteres.";
  }

  // Validación del celular
  const celularRegex = /^\+569\d{8}$/; // Formato: +569 seguido de 8 dígitos
  if (!formData.celular || !celularRegex.test(formData.celular)) {
    newErrors.celular =
      "El celular debe tener el formato +569 seguido de 8 dígitos.";
  }

  return newErrors;
};
