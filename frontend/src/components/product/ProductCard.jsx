import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>Producto no disponible.</div>;
  }

  return (
    <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <img
        className="rounded-lg object-cover w-full h-48 mb-4"
        src={product.foto}
        alt={product.nombre}
      />
      <Typography variant="h5" className="font-bold text-gray-800 mb-2">
        {product.nombre}
      </Typography>
      <Typography className="text-sm text-gray-500 mb-2">
        SKU: {product.sku}
      </Typography>
      <Typography variant="h6" className="text-gray-700 mb-2">
        ${product.precio_m2} CLP
      </Typography>
      <Link to={`/products/${product.sku}`}>
        <Button color="blue" size="lg" className="w-full mt-2">
          Ver Detalles
        </Button>
      </Link>
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
  }),
};

export default ProductCard;
