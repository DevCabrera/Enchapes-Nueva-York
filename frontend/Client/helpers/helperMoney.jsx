//CLP
const formatPriceCLP = (price) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);
};
export default formatPriceCLP;
