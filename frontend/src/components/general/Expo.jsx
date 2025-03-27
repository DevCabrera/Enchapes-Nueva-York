import { Button, Typography } from "@material-tailwind/react";

export default function Expoir() {
  return (
    <figure className="relative h-[400px] w-full shadow-xl shadow-blue-gray-900/50 overflow-hidden">
      <img
        className="h-full w-full  object-cover object-center animate-zoomc overflow-hidden"
        src="src/img/enchape1.jpg"
        alt="nature image"
      />
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h5" color="blue-gray">
            ¿Aún tienes dudas?
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
            Ven a revisar personalmente los revestimientos a nuestra sucursal
            ubicada en: La Quincha 179, Quilicura, Santiago de Chile.
          </Typography>
        </div>
        <Typography variant="h5" color="blue-gray">
          <Button variant="outlined">Ir al mapa</Button>
        </Typography>
      </figcaption>
    </figure>
  );
}
