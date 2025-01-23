import React from "react";
import PropTypes from "prop-types";

class ErrorGlobals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("Error capturado:", error); // Para depuración en consola
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Puedes enviar el error a un servicio de monitoreo, como Sentry
    console.error("Detalles del error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
          <h1 className="text-3xl font-bold mb-4">Algo salió mal</h1>
          <p className="text-lg mb-4">
            Intenta recargar la página o contacta al soporte técnico si el
            problema persiste.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
          >
            Recargar
          </button>
        </div>
      );
    }

    // Renderizar los componentes hijos
    return this.props.children;
  }
}

ErrorGlobals.propTypes = {
  children: PropTypes.node.isRequired, // Aseguramos que los hijos sean requeridos
};

export default ErrorGlobals;
