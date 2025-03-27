import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
export default function Carouselw() {
  return (
    <Carousel>
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="src/img/enchape1.jpg"
          alt="image 1"
          className="h-full w-full object-cover animate-zoomc"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/55">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Enchapes Nueva York.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Todo muro es único como nuestros clientes.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                <Link to="/products">
                  <a className="flex items-center">Revestimientos</a>
                </Link>
              </Button>
              <Button size="lg" color="white" variant="text" to="/home">
                <Link to="/gallery">
                  <a className="flex items-center">Galería</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="src/img/c2.jpg"
          alt="image 2"
          className="h-full w-full object-cover animate-zoomc"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              La belleza de los revestimientos.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Descubre el encanto de los revestimientos de muro que transforman espacios en verdaderas
              obras de arte. Fabricados con materiales de la más alta calidad,
              nuestros revestimientos no solo aportan un diseño elegante y moderno,
              sino que también ofrecen durabilidad y resistencia inigualables.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                <Link to="/products">
                  <a className="flex items-center">Revestimientos</a>
                </Link>
              </Button>
              <Button size="lg" color="white" variant="text" to="/home">
                <Link to="/gallery">
                  <a className="flex items-center">Galería</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="src/img/c3.jpg" 
          alt="image 3"
          className="h-full w-full object-cover animate-zoomc"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              ¿Por qué vale la pena comprar?
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Invertir en nuestros revestimientos de muro es mucho más que una compra; es una decisión inteligente y a largo plazo. Cada producto está diseñado pensando en combinar estética y funcionalidad, ofreciendo una durabilidad que supera las expectativas.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                <Link to="/products">
                  <a className="flex items-center">Revestimientos</a>
                </Link>
              </Button>
              <Button size="lg" color="white" variant="text" to="/home">
                <Link to="/gallery">
                  <a className="flex items-center">Galería</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
