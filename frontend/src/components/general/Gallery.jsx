import { useEffect, useState } from "react";
import { getGalleryImages } from "../../../Client/Services/galleryServices";

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };

    fetchImages();
  }, []);

  const openModal = (imageLink) => {
    setSelectedImage(imageLink);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Galería</h2>

      {/* Grid de imágenes */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 mt-[200px]">
          {images.map((image) => (
            <div
              key={image.id_image}
              className="overflow-hidden flex justify-center"
            >
              <img
                className="h-[400px] w-auto max-w-full rounded-lg object-cover object-center shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                src={image.url}
                alt="gallery-photo"
                onClick={() => openModal(image.url)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No hay imágenes en la galería.
        </p>
      )}

      {/* Modal de imagen */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={closeModal} // Detectar clics fuera de la imagen
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {" "}
            <img
              className="max-h-[80vh] max-w-[80vw] rounded-lg"
              src={selectedImage}
              alt="expanded-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}
