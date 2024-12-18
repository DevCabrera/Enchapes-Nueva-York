export default function AboutUs() {
    return (
      <section className="bg-blue-gray-400 text-white py-16 mb-8 shadow-lg">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          
          {/* Columna de Texto */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">¿Quienes somos?</h2>
            <p className="mb-4">
            En nuestra empresa nos especializamos en la comercialización y distribución de materiales de construcción, con un enfoque en productos de alta calidad que satisfacen las necesidades de diversos proyectos. Nuestro producto estrella es el ladrillo, elaborado artesanalmente a partir de arcilla cocida a altas temperaturas, lo que le otorga una excepcional durabilidad y resistencia tanto a la compresión como a las condiciones climáticas adversas.
            </p>
            <p className="mb-4">
            Nos comprometemos a ofrecer un servicio al cliente cercano y personalizado, adaptado a las exigencias de cada proyecto, lo que nos ha permitido construir relaciones de confianza con nuestros clientes y garantizar su satisfacción durante más de 15 años.
            </p>
            <p className="mb-4">
              Pon tu confianza en nosotros sin temor!!
            </p>
  
            {/* Lista de Productos */}
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">➤</span> Compromiso
              </li>
              <li className="flex items-center">
                <span className="mr-2">➤</span> Calidad
              </li>
              <li className="flex items-center">
                <span className="mr-2">➤</span> Responsables
              </li>
            </ul>
          </div>
  
          {/* foto de nosotros */}
          <div className="lg:w-1/2 flex justify-center mt-8 ml-8 lg:mt-0 max-h-[600px] max-w-[600px] transition-transform duration-300 ease-in-out transform hover:scale-105">
            <img
              src="src/img/20220107_164845.jpg"
              alt="Personaje de la empresa"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>
    );
  }
  