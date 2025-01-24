import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {

  return (
    <div className="bg-blue-gray-50 p-4 rounded-lg shadow-lg border-2 border-blue-gray-500">
      <img
        src={product.foto}
        alt={product.nombre}
        className="w-full h-64 object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
      />
      <h3 className="mt-4 text-lg font-semibold">{product.nombre}</h3>
      <p className="mt-2 text-gray-900 font-bold">${product.precio_m2} CLP</p>
      <p className="text-blue-gray-700 text-sm mt-1">Impuesto incluido</p>
      <div className="flex justify-center mt-4">
        <Link to={`/products/${product.sku}`}>
          <button className="bg-[#2c4255] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#3c5d7a]">
            Ver Detalles
          </button>
        </Link>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id_producto: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    precio_m2: PropTypes.number.isRequired,
    foto: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
