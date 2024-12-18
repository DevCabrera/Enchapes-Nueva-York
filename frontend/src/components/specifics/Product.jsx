import { Button, Typography } from "@material-tailwind/react";

export default function Product() {
  return (
    <div className="flex justify-center mt-10 space-x-8">
      <div className="h-[400px] w-[600px] mt-10 ml-[10px]">
        <img
          className="rounded-lg object-scale-down object-left shadow-xl shadow-blue-gray-900/50"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
        />
      </div>
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* SKU */}
        <Typography className="text-sm text-gray-500 mb-1">
          SKU: codigo del enchape
        </Typography>

        {/* Nombre del producto */}
        <Typography variant="h3" className="font-bold text-gray-800 mb-2">
          Revestimiento New York
        </Typography>

        {/* Precio */}
        <Typography variant="h4" className="text-gray-700 mb-1">
          $24.500
        </Typography>
        <Typography className="text-sm text-gray-500 mb-4">
          Impuesto incluido
        </Typography>

        {/* Cantidad */}
        <div className="mb-4">
          <label htmlFor="quantity" className="text-sm text-gray-500">
            Cantidad en m2
          </label>
          <input
            id="quantity"
            type="number"
            defaultValue={1}
            className="w-16 p-2 mt-1 text-center border border-gray-300 rounded-md"
          />
        </div>

        {/* Botón de compra */}
        <Button color="red" size="lg" className="w-full mb-6">
          Agregar Compra
        </Button>

        {/* Descripción del producto */}
        <Typography variant="h5" className="font-semibold text-gray-800 mb-3">
          Revestimiento New York
        </Typography>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Ancho: de 3cm a 28cm aprox.</li>
          <li>Alto: 5,5cm aprox.</li>
          <li>Espesor: 1,5cm aprox.</li>
          <li>Peso M2: 16kg aprox.</li>
          <li>Valor por Metro Cuadrado</li>
          <li>Rendimiento considera Cantería de 1cm aprox.</li>
        </ul>

        {/* Iconos de redes sociales */}
        <div className="flex space-x-4 mt-6 justify-center text-xl text-gray-600">
          <a href="#">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-pinterest"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
