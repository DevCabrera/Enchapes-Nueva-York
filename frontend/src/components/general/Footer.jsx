import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-white p-8 mt-10">
      <div className="flex flex-col items-center justify-center gap-y-6 text-center md:justify-between">
        <img
          src="src/img/Martillazo.png"
          alt="logo-ct"
          className="w-20"
        />
        <ul className="flex flex-col items-center gap-y-2">
          {/* Nosotros */}
          <li>
            <Link to="/contact" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-[#E67E22]"
              >
                Nosotros
              </Typography>
            </Link>
          </li>

          {/* Instagram */}
          <li>
            <a
              href="https://www.instagram.com/enchapes_newyork/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <title>Instagram</title>
                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
              </svg>
              <Typography className="font-normal transition-colors hover:text-[#E67E22]">Instagram</Typography>
            </a>
          </li>

          {/* WhatsApp */}
          <li>
            <a
              href="https://wa.me/56971042341?text=Bienvenido%20a%20Enchapes%20Nueva%20York"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              <svg
                role="img"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <title>WhatsApp</title>
                <path d="M16 .5C7.439.5.5 7.439.5 16c0 3.038.833 5.872 2.276 8.316L.5 31.5l7.184-2.276A15.43 15.43 0 0 0 16 31.5c8.561 0 15.5-6.939 15.5-15.5S24.561.5 16 .5zm0 2c7.452 0 13.5 6.048 13.5 13.5S23.452 29.5 16 29.5c-2.59 0-5.002-.75-7.048-2.048l-.5-.309-4.5 1.5 1.5-4.5-.309-.5A13.452 13.452 0 0 1 2.5 16C2.5 8.548 8.548 2.5 16 2.5zm-3.5 6c-.276 0-.5.224-.5.5v2c0 .276.224.5.5.5h2c.276 0 .5-.224.5-.5v-2c0-.276-.224-.5-.5-.5h-2zm3.5 4c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z" />
              </svg>
              <Typography className="font-normal transition-colors hover:text-[#E67E22]">WhatsApp</Typography>
            </a>
          </li>
          <li>
            <Link to="/products" className="flex items-center gap-2 hover:text-[#E67E22]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
              </svg>

              Revestimientos
            </Link>
          </li>

        </ul>
        <Typography color="gray" className="mt-4 font-normal text-center">
          Ven a revisar personalmente los revestimientos a nuestra sucursal
          ubicada en: La Quincha 179, Quilicura, Santiago de Chile.
        </Typography>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; Enchapes Nueva York
      </Typography>
    </footer>
  );
}