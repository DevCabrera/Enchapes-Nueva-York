export default function Contact() {
  return (
    <>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Texto del Showroom */}
            <div className="flex flex-col justify-center bg-[#121B22] text-white p-8 rounded-lg shadow-lg">
              <h2 className="text-4xl font-bold mb-4">Nuestras muestras</h2>
              <p className="text-lg mb-6">
               Ven a verificar por ti mismo la calidad de nuestros{" "}<br />
                <strong>revestimientos</strong>. 
                <br />
                Haremos realidad{" "}
                <strong>tus ideas y tus sueños</strong>
              
              </p>
            </div>

            {/* Imagen del Showroom */}
            <div>
              <img
                src="src/img/aaa.jpg"
                alt="Showroom"
                className="rounded-lg shadow-lg w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Nuestra ubicacion */}

            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-gray-800">
              <h3 className="text-2xl font-bold text-center mb-4">Visítanos</h3>
              <p className="text-center">
                La Quincha 179,
                <br />
                Quilicura.
                <br />
                Santiago de Chile.
              </p>
            </div>
            {/* horario */}

            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-gray-800">
              <h3 className="text-2xl font-bold text-center mb-4">Horarios</h3>
              <p className="text-center">
                Lunes a viernes de:
                <br />
                <strong>9:00 Am a 18:30 PM</strong>
                <br />
                <p className="font-bold text-red-600">
                  (Fin de semana 10:30hrs a 17:30hrs)
                </p>
              </p>
            </div>
            {/* Hablemos */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-gray-800">
              <h3 className="text-2xl font-bold text-center mb-4">Hablemos</h3>
              <p className="text-center">
                Móvil:{" "}
                <a href="tel:+56933924802" className="font-bold">
                  +569 3392 4802
                </a>
                <br />
                Correo:{" "}
                <a href="mailto:hola@ideasmda.cl" className="text-blue-500">
                  enchapesnewyork.cl@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
