import { Link } from "react-router-dom";

export default function IdeasHome() {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-6">
          Tenemos estas ideas para ti!
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Primera fila, imagen grande */}
          <div className="col-span-2">
            <img
              src="src/img/i1.jpg"
              alt="Idea 1"
              className="w-full h-[400px] object-cover rounded-lg shadow-md animate-zoom"
            />
          </div>
          {/* Segunda fila, dos imágenes pequeñas */}
          <div className="col-span-1">
            <img
              src="src/img/i2.jpg"
              alt="Idea 2"
              className="w-full h-[400px] object-cover rounded-lg shadow-md animate-zoom"
            />
          </div>
          <div className="col-span-1">
            <img
              src="src/img/i3.jpg"
              alt="Idea 3"
              className="w-full h-[400px] object-cover rounded-lg shadow-md animate-zoom"
            />
          </div>
          {/* Tercera fila, una imagen pequeña */}
          <div className="col-span-2">
            <img
              src="src/img/i4.jpg"
              alt="Idea 4"
              className="w-full h-[400px] object-cover rounded-lg shadow-md animate-zoom"
            />
          </div>
        </div>

        <div className="text-center mt-6">
            <Link to="/gallery">
          <button className="bg-[#2c4255] text-white py-2 px-6 rounded-md ">
            Más Ideas
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
