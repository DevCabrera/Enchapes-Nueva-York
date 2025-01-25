import { useState, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
} from "../../../Client/Services/productServices";
import { Button, Typography } from "@material-tailwind/react";
import AdminProductMod from "./AdminProductMod"; // Importar el modal de modificación

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModModalOpen, setIsModModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este producto?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id_producto !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleModify = (product) => {
    setSelectedProduct(product);
    setIsModModalOpen(true);
  };

  const handleSave = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id_producto === updatedProduct.id_producto
          ? updatedProduct
          : product
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id_producto} className="p-4 border rounded shadow-lg">
          <img
            src={
              product.imagenes && product.imagenes.length > 0
                ? product.imagenes[0].url
                : "default-image-url" // URL de una imagen predeterminada si no hay imágenes
            }
            alt={product.nombre}
            className="w-full h-32 object-cover rounded mb-2"
          />
          <Typography variant="h5" className="font-bold">
            {product.nombre}
          </Typography>
          <Typography variant="small" className="text-gray-500">
            SKU: {product.sku}
          </Typography>
          <Typography variant="h6" className="text-blue-500 mt-2">
            ${product.precio_m2} CLP
          </Typography>
          <div className="mt-4 flex justify-between">
            <Button
              size="sm"
              color="yellow"
              onClick={() => handleModify(product)}
            >
              Modificar
            </Button>
            <Button
              size="sm"
              color="red"
              onClick={() => handleDelete(product.id_producto)}
            >
              Eliminar
            </Button>
          </div>
        </div>
      ))}
      {isModModalOpen && (
        <AdminProductMod
          isOpen={isModModalOpen}
          onClose={() => setIsModModalOpen(false)}
          product={selectedProduct}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminProductList;
