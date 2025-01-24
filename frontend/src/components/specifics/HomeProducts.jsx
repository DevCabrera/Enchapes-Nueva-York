import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../Client/Services/productServices";
import ProductCard from "../product/ProductCard";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Limitamos a los primeros 4 productos
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-16">
      {/* Título y subtítulo */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Nuestros revestimientos</h1>
        <p className="text-gray-900 mt-2">
          Están enfocados en darte el mejor estilo a tu vida.
        </p>
      </div>

      {/* Galería de productos */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id_producto} product={product} />
        ))}
      </div>

      {/* Botón para ver todo el catálogo */}
      <div className="flex justify-center mt-10">
        <Link to="/products">
          <button className="bg-[#2c4255] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#3c5d7a]">
            Ir a explorar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeProducts;
