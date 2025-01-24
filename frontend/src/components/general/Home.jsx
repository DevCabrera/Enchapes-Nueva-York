import HomeProducts from "../specifics/HomeProducts";
import AboutUs from "../general/AboutUs";
import IdeasHome from "./IdeasHome";
import Expoir from "./Expo";
import PropTypes from "prop-types";

const Home = () => {
  return (
    <div>
      <HomeProducts />
      <AboutUs />
      <IdeasHome />
      <Expoir />
      <div className="text-center mt-6"></div>
    </div>
  );
};
Home.propTypes = { setIsLoginOpen: PropTypes.func.isRequired };
export default Home;
