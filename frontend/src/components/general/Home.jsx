import HomeProducts from "../specifics/HomeProducts";
import AboutUs from "../general/AboutUs";
import IdeasHome from "./IdeasHome";
import Expoir from "./Expo";
import PropTypes from "prop-types";

const Home = ({ setIsLoginOpen }) => {
  return (
    <div>
      <HomeProducts />
      <AboutUs />
      <IdeasHome />
      <Expoir />
      <div className="text-center mt-6">
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};
Home.propTypes = { setIsLoginOpen: PropTypes.func.isRequired };
export default Home;
