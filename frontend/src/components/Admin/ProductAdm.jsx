import { useState, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../../Client/Services/productServices";
import { Button, Input, Typography, Card } from "@material-tailwind/react";
import AdminProductForm from "./AdminProductForm";
// import OfferModal from "./OfferModal"; // Comentado

const ProductAdm = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const [isOfferModalOpen, setIsOfferModalOpen] = useState(false); // Comentado
  // const [selectedProduct, setSelectedProduct] = useState(null); // Comentado
  // const [selectedOffer, setSelectedOffer] = useState(null); // Comentado

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

  const handleEdit = (product) => {
    setEditingProductId(product.id_producto);
    setFormData({ ...product, nuevasImagenes: [] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      nuevasImagenes: [...prevFormData.nuevasImagenes, ...newImages],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imagenes: prevFormData.imagenes.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveNewImage = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      nuevasImagenes: prevFormData.nuevasImagenes.filter((_, i) => i !== index),
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const updatedFormData = new FormData();
      for (let key in formData) {
        if (key === "nuevasImagenes") {
          formData.nuevasImagenes.forEach((file) =>
            updatedFormData.append("fotos", file)
          );
        } else {
          updatedFormData.append(key, formData[key]);
        }
      }

      await updateProduct(formData.id_producto, updatedFormData);
      setProducts(
        products.map((prod) =>
          prod.id_producto === formData.id_producto ? formData : prod
        )
      );
      setEditingProductId(null);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id_producto !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // const handleOpenOfferModal = (product) => {
  //   if (product) {
  //     setSelectedProduct(product);
  //     setSelectedOffer(product.ofertas?.[0] || null);
  //     setIsOfferModalOpen(true);
  //     console.log("Producto seleccionado:", product);
  //   } else {
  //     console.error("No se ha seleccionado un producto válido.");
  //   }
  // };

  // const handleSaveOffer = (savedOffer) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((prod) =>
  //       prod.id_producto === savedOffer.id_producto
  //         ? { ...prod, ofertas: [savedOffer] }
  //         : prod
  //     )
  //   );
  // };

  // const handleCloseOfferModal = () => {
  //   setSelectedProduct(null);
  //   setSelectedOffer(null);
  //   setIsOfferModalOpen(false);
  // };

  const TABLE_HEAD = [
    "Imágenes",
    "Nombre",
    "SKU",
    "Precio",
    "Ancho",
    "Alto",
    "Espesor",
    "Peso",
    "Oferta",
    "Acciones",
  ];

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        Administración de Productos
      </Typography>

      {/* Botón para agregar producto */}
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsFormOpen(true)}
      >
        Agregar Producto
      </button>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id_producto}>
                {/* Imágenes */}
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {product.imagenes?.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img.url}
                          alt={product.nombre}
                          className="w-12 h-12 object-cover rounded"
                        />
                        {editingProductId === product.id_producto && (
                          <Button
                            size="sm"
                            color="red"
                            className="absolute -top-2 -right-2 text-xs"
                            onClick={() => handleRemoveImage(index)}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    {/* Mostrar imágenes nuevas antes de subir */}
                    {formData.nuevasImagenes?.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(img)}
                          alt="Nueva"
                          className="w-12 h-12 object-cover rounded"
                        />
                        <Button
                          size="sm"
                          color="red"
                          className="absolute -top-2 -right-2 text-xs"
                          onClick={() => handleRemoveNewImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  {editingProductId === product.id_producto && (
                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="mt-2"
                    />
                  )}
                </td>

                {/* Datos del producto */}
                {[
                  "nombre",
                  "sku",
                  "precio_m2",
                  "ancho",
                  "alto",
                  "espesor",
                  "peso_m2",
                ].map((field) => (
                  <td key={field} className="p-4">
                    {editingProductId === product.id_producto ? (
                      <Input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                      />
                    ) : (
                      product[field]
                    )}
                  </td>
                ))}

                {/* Oferta */}
                <td className="p-4">
                  {product.ofertas?.length > 0 ? (
                    <span className="text-green-500 font-bold">
                      -{product.ofertas[0].porcentaje_descuento}% | $
                      {product.ofertas[0].precio_oferta}
                    </span>
                  ) : (
                    <span className="text-gray-500">Sin oferta</span>
                  )}
                </td>

                {/* Acciones */}
                <td className="p-4">
                  <div className="flex gap-2">
                    {editingProductId === product.id_producto ? (
                      <Button color="green" onClick={handleSaveEdit}>
                        Guardar
                      </Button>
                    ) : (
                      <Button color="blue" onClick={() => handleEdit(product)}>
                        Editar
                      </Button>
                    )}
                    <Button
                      color="purple"
                      // onClick={() => handleOpenOfferModal(product)}
                      disabled // Deshabilitado
                    >
                      {product.ofertas?.length > 0 ? "Editar Oferta" : "Agregar Oferta"}
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleDelete(product.id_producto)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <AdminProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={(newProduct) => {
          setProducts((prevProducts) => [...prevProducts, newProduct]);
          setIsFormOpen(false);
        }}
      />
      {/* <OfferModal
        isOpen={isOfferModalOpen}
        onClose={handleCloseOfferModal}
        product={selectedProduct}
        offer={selectedOffer}
        onSave={handleSaveOffer}
      /> */}
    </div>
  );
};

export default ProductAdm;