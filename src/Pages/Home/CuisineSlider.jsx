import React from "react";
import images from "../../Images/images.json";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import classes from "./CuisineSlider.module.css";
import { Link } from "react-router-dom";

// function to get number of scroll item per page (for responsive design)
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

const CuisineSlider = (props) => {
  const { cuisine: items } = images;

  return (
    <div className={classes.cuisine_slider}>
      <h3>Try different cuisine recipe</h3>
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
          aria-label="Cusines food images"
        >
          {items.map((item) => {
            return (
              <SplideSlide key={item.id}>
                <Link to={`/cuisine/${item.title}`}>
                  <div className={classes.slider_item} key={item.id}>
                    <img
                      src={require(`../../Images/Cuisines/${item.image}`)}
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

export default CuisineSlider;
