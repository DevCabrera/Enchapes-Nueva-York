import { useEffect, useState } from "react";
import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
} from "../../../Client/Services/galleryServices";
import { useAuth } from "../../../Client/Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button, Input } from "@material-tailwind/react";

const GalleryAdmin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.id_tipo_usuario !== 1)) {
      navigate("/");
    } else if (user?.id_tipo_usuario === 1) {
      fetchImages();
    }
  }, [user, loading, navigate]);

  const fetchImages = async () => {
    try {
      const data = await getGalleryImages();
      setImages(data);
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      await uploadGalleryImage(selectedFile);
      setSelectedFile(null);
      fetchImages();
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar esta imagen?"
    );
    if (!confirmDelete) return;

    try {
      await deleteGalleryImage(id);
      fetchImages();
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  if (loading || loadingImages)
    return <Typography variant="h5">Cargando...</Typography>;

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">
        Administración de Galería
      </Typography>

      {/* Subida de imágenes */}
      <div className="mb-6 flex items-center gap-4">
        <Input type="file" onChange={handleFileChange} accept="image/*" />
        <Button onClick={handleUpload} disabled={!selectedFile}>
          Subir Imagen
        </Button>
      </div>

      {/* Tabla de imágenes */}
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Imagen</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id_image} className="border-b">
                <td className="p-4">
                  <img
                    src={image.url}
                    alt="Imagen"
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-4">{image.public_id.split("/").pop()}</td>
                <td className="p-4">
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => handleDelete(image.id_image)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default GalleryAdmin;
