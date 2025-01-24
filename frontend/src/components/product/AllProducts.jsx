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
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 p-6">
      {products.map((product) => (
        <ProductCard key={product.id_producto} product={product} />
      ))}
    </div>
  );
};

export default AllProducts;
