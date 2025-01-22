import { Link } from "react-router-dom";

const products = [
  {
    name: "Revestimiento Liso Largo",
    price: "$28.800",
    imgSrc: "src/img/image.png",
  },
  {
    name: "Revestimiento New York",
    price: "$24.500",
    imgSrc: "src/img/IMG_20230218_155742.jpg",
  },
  {
    name: "Revestimiento Wissepi",
    price: "$21.300",
    imgSrc: "src/img/wiss.jpg",
  },
  {
    name: "Revestimiento Artesanal Corto",
    price: "$17.300",
    imgSrc: "src/img/i1.jpg",
  },
  {
    name: "Revestimiento Viejo Colonial",
    price: "$21.300",
    imgSrc: "ruta-a-imagen5",
  },
  {
    name: "Revestimiento Texturado Corto",
    price: "$33.900",
    imgSrc: "ruta-a-imagen6",
  },
];

export default function HomeProducts() {
  return (
    <div className="container mx-auto py-16">
      {/* Título y subtítulo */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Nustros revestimientos</h1>
        <p className="text-gray-900 mt-2">
          Estan enfocados en darte el mejor estilo a tu vida.
        </p>
      </div>

      {/* Galería de productos */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6 ">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-[blue-gray-50] p-4 rounded-lg shadow-lg border-2 border-blue-gray-500"
          >
            <img
              src={product.imgSrc}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="mt-2 text-gray-900 font-bold">{product.price}</p>
            <p className="text-blue-gray-700 text-sm mt-1">Impuesto incluido</p>
          </div>
        ))}
      </div>

      {/* Botón para ver todo el catálogo */}
      <div className="flex justify-center mt-10">
        <Link to="/products">
          <button className="bg-[#2c4255] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#3c5d7a]">
            <a className="flex items-center">Ir a explorar los detalles</a>
          </button>
        </Link>
      </div>
    </div>
  );
}
