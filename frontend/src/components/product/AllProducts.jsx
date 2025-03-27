import { useState, useEffect } from "react";
import { getProducts } from "../../../Client/Services/productServices";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);

  if (!products || products.length === 0) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Nuestros revestimientos</h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id_producto} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
