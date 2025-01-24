import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../Client/Services/productServices";
import { addToCart } from "../../../Client/Services/cartServices";
import { Button, Typography } from "@material-tailwind/react";

const Product = () => {
  const formatPriceCLP = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const { sku } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = async () => {
    try {
      await addToCart(product, quantity);
      console.log(
        `Producto agregado al carrito: ${product.nombre}, Cantidad: ${quantity}`
      );
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10 space-x-8">
      <div className="h-[400px] w-[450px] mt-10 ml-[10px]">
        <img
          className="
          rounded-lg 
          object-scale-down 
          object-left 
          shadow-xl
        shadow-blue-gray-900/50 
          transition-transform duration-300 ease-in-out transform hover:scale-105"
          src={product.foto}
          alt={product.nombre}
        />
      </div>
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Typography className="text-sm text-gray-500 mb-1">
          SKU: {product.sku}
        </Typography>
        <Typography variant="h3" className="font-bold text-gray-800 mb-2">
          {product.nombre}
        </Typography>
        <Typography variant="h4" className="text-gray-700 mb-1">
          {formatPriceCLP(product.precio_m2)} CLP
        </Typography>
        <Typography className="text-sm text-gray-500 mb-4">
          IVA incluido
        </Typography>
        <div className="mb-4">
          <label htmlFor="quantity" className="text-sm text-black font-bold">
            Cantidad en m²
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 p-2 mt-1 text-center border border-gray-300 rounded-md"
          />
        </div>
        <Button
          size="lg"
          className="w-full mb-6 bg-[#2c4255] hover:bg-[#3c5d7a]"
          onClick={handleAddToCart}
        >
          Agregar Compra
        </Button>
        <Typography variant="h5" className="font-semibold text-gray-800 mb-3">
          {product.nombre}
        </Typography>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Ancho: {product.ancho} cm</li>
          <li>Alto: {product.alto} cm</li>
          <li>Espesor: {product.espesor} cm</li>
          <li>Peso m²: {product.peso_m2} kg</li>
          <li>
            Valor por Metro Cuadrado: {formatPriceCLP(product.precio_m2)} CLP
          </li>
          <li>Rendimiento considera Cantería de 1 cm aprox.</li>
        </ul>
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
