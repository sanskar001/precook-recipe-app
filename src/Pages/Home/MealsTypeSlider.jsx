import React from "react";
import images from "../../Images/images.json";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import classes from "./MealsTypeSlider.module.css";
import { Link } from "react-router-dom";

const getPerPageScrollItem = () => {
  const screenWidth = window.innerWidth;

  // Mobile screen
  if (screenWidth <= 600) {
    return 3;
  }

  // Tablet and desktop screen
  if (screenWidth <= 1200) {
    return Math.ceil(window.innerWidth / 200);
  }

  return 6;
};

const MealsTypeSlider = (props) => {
  const { mealsType: items } = images;

  return (
    <div className={classes.meals_type_slider}>
      <h3>Recipe as per your meal</h3>
      <div className={classes.backdrop}></div>
      <div className={classes.slider_container}>
        <Splide
          options={{
            perPage: getPerPageScrollItem(),
            perMove: 1,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "1rem",
          }}
          aria-label="Meals food images"
        >
          {items.map((item) => {
            return (
              <SplideSlide key={item.id}>
                <Link to={`/meal-type/${item.title}`}>
                  <div className={classes.slider_item} key={item.id}>
                    <img
                      src={require(`../../Images/Meals/${item.image}`)}
                      alt={item.title}
                    />
                    <p>{item.title}</p>
                  </div>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};

export default MealsTypeSlider;
