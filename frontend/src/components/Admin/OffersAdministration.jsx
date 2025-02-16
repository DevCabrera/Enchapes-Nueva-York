// import { useEffect, useState } from "react";
// import { useAuth } from "../../../Client/Context/AuthProvider";
// import {
//   getOffers,
//   createOffer,
//   updateOffer,
//   deleteOffer,
// } from "../../../Client/Services/offersServices";
// import {
//   Typography,
//   Input,
//   Button,
//   Select,
//   Option,
// } from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";

// const OfferAdministration = () => {
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();
//   const [offers, setOffers] = useState([]);
//   const [loadingOffers, setLoadingOffers] = useState(true);
//   const [filterProduct, setFilterProduct] = useState("");
//   const [filterState, setFilterState] = useState("todos");

//   useEffect(() => {
//     if (!loading && (!user || user.id_tipo_usuario !== 1)) {
//       navigate("/");
//     } else if (user?.id_tipo_usuario === 1) {
//       const fetchOffers = async () => {
//         try {
//           const data = await getOffers();
//           setOffers(data);
//         } catch (error) {
//           console.error("Error al obtener las ofertas:", error);
//         } finally {
//           setLoadingOffers(false);
//         }
//       };
//       fetchOffers();
//     }
//   }, [user, loading, navigate]);

//   const filteredOffers = offers.filter((offer) => {
//     const matchesProduct = offer.id_producto.toString().includes(filterProduct);
//     const matchesState =
//       filterState === "todos" ||
//       (offer.activa ? "activa" : "inactiva") === filterState;
//     return matchesProduct && matchesState;
//   });

//   if (loading || loadingOffers) {
//     return <Typography variant="h5">Cargando ofertas...</Typography>;
//   }

//   return (
//     <div className="p-6">
//       <Typography variant="h4" className="mb-4">
//         Administración de Ofertas
//       </Typography>
//       <div className="flex gap-4 mb-4">
//         <Input
//           type="text"
//           placeholder="Filtrar por producto (ID)"
//           value={filterProduct}
//           onChange={(e) => setFilterProduct(e.target.value)}
//           className="w-32"
//         />
//         <Select
//           value={filterState}
//           onChange={(value) => setFilterState(value)}
//           className="w-32"
//         >
//           <Option value="todos">Todos</Option>
//           <Option value="activa">Activa</Option>
//           <Option value="inactiva">Inactiva</Option>
//         </Select>
//       </div>
//       {filteredOffers.length === 0 ? (
//         <Typography variant="h5">No hay ofertas que coincidan.</Typography>
//       ) : (
//         <table className="min-w-full table-auto border-collapse text-left">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Producto (ID)</th>
//               <th className="border px-4 py-2">Precio Oferta</th>
//               <th className="border px-4 py-2">Inicio</th>
//               <th className="border px-4 py-2">Fin</th>
//               <th className="border px-4 py-2">Activa</th>
//               <th className="border px-4 py-2">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOffers.map((offer) => (
//               <tr key={offer.id_offer}>
//                 <td className="border px-4 py-2">{offer.id_producto}</td>
//                 <td className="border px-4 py-2">{offer.precio_oferta} CLP</td>
//                 <td className="border px-4 py-2">
//                   {new Date(offer.fecha_inicio).toLocaleDateString()}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {new Date(offer.fecha_fin).toLocaleDateString()}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {offer.activa ? "Sí" : "No"}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {/* Aquí puedes agregar botones para editar o eliminar la oferta */}
//                   <Button
//                     color="red"
//                     size="sm"
//                     onClick={() => deleteOffer(offer.id_offer)}
//                   >
//                     Eliminar
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       {/* Aquí podrías agregar un formulario modal para crear o editar ofertas */}
//       <Button color="green" className="mt-4">
//         Agregar Oferta
//       </Button>
//     </div>
//   );
// };

// export default OfferAdministration;
