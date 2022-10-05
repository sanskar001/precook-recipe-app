import React from "react";
import Banner from "./Banner";
import CuisineSlider from "./CuisineSlider";
import classes from "./Home.module.css";
import InspirationSlider from "./InspirationSlider";
import MealsTypeSlider from "./MealsTypeSlider";
import PopularSlider from "./PopularSlider";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <React.Fragment>
      <MainHeader />
      <div className={classes.home}>
        <Banner />
        <InspirationSlider />
        <CuisineSlider />
        <PopularSlider />
        <MealsTypeSlider />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
