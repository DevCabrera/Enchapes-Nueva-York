import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../Client/Services/productServices";
import { Button, Typography } from "@material-tailwind/react";

const Product = () => {
  const formatPriceCLP = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };
  const { sku } = useParams(); // Obtener SKU desde los parámetros de la URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(sku);
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };
    fetchProduct();
  }, [sku]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="flex justify-center mt-10 space-x-8">
      <div className="h-[400px] w-[600px] mt-10 ml-[10px]">
        <img
          className="rounded-lg object-scale-down object-left shadow-xl shadow-blue-gray-900/50"
          src={product.foto}
          alt={product.nombre}
        />
      </div>
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* SKU */}
        <Typography className="text-sm text-gray-500 mb-1">
          SKU: {product.sku}
        </Typography>

        {/* Nombre del producto */}
        <Typography variant="h3" className="font-bold text-gray-800 mb-2">
          {product.nombre}
        </Typography>

        {/* Precio */}
        <Typography variant="h4" className="text-gray-700 mb-1">
          {formatPriceCLP(product.precio_m2)}
        </Typography>
        <Typography className="text-sm text-gray-500 mb-4">
          Impuesto incluido
        </Typography>

        {/* Cantidad */}
        <div className="mb-4">
          <label htmlFor="quantity" className="text-sm text-gray-500">
            Cantidad en m2
          </label>
          <input
            id="quantity"
            type="number"
            defaultValue={1}
            className="w-16 p-2 mt-1 text-center border border-gray-300 rounded-md"
          />
        </div>

        {/* Botón de compra */}
        <Button color="red" size="lg" className="w-full mb-6">
          Agregar Compra
        </Button>

        {/* Descripción del producto */}
        <Typography variant="h5" className="font-semibold text-gray-800 mb-3">
          {product.nombre}
        </Typography>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Ancho: {product.ancho} cm</li>
          <li>Alto: {product.alto} cm</li>
          <li>Espesor: {product.espesor} cm</li>
          <li>Peso M2: {product.peso_m2} kg</li>
          <li>Valor por Metro Cuadrado: {product.precio_m2}</li>
          <li>Rendimiento considera Cantería de 1cm aprox.</li>
        </ul>

        {/* Iconos de redes sociales */}
        <div className="flex space-x-4 mt-6 justify-center text-xl text-gray-600">
          <a href="#">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-pinterest"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;