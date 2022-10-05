import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import classes from "./IngredientSlider.module.css";
import Button from "../../components/UI/Button";

// function to get number of scroll item per page (for responsive design)
const getPerPageScrollItem = () => {
  const screenWidth = window.innerWidth;

  // Mobile screen
  if (screenWidth <= 500) {
    return 3;
  }

  // Tablet and desktop screen
  if (screenWidth < 1000) {
    return Math.floor(window.innerWidth / 100) - 2;
  }

  return 8;
};

// Ingredient image URL
const imageURL = "https://spoonacular.com/cdn/ingredients_100x100/";

const IngredientSlider = (props) => {
  const [servingCount, setServingCount] = useState(props.servings);

  const increaseServingCountHandler = () => {
    setServingCount((preCount) => preCount + 1);
  };

  const decreaseServingCountHandler = () => {
    setServingCount((preCount) => {
      if (preCount > 0) {
        return preCount - 1;
      } else {
        return 0;
      }
    });
  };

  const calculateAmount = (amount) => {
    const total = (amount / props.servings) * servingCount;

    if (Number.isInteger(total)) {
      // If total is integer - no formating
      return total;
    } else {
      // If total is float - formating
      return total.toFixed(2);
    }
  };

  return (
    <div className={classes.ingredient_slider}>
      <div className={classes.heading}>
        <h3>Ingredient</h3>
        <div className={classes.serving}>
          <IoPerson />
          <p>{servingCount} Serving</p>
          <Button
            className={classes.serving_btn}
            onClick={increaseServingCountHandler}
          >
            +
          </Button>
          <Button
            className={classes.serving_btn}
            onClick={decreaseServingCountHandler}
          >
            -
          </Button>
        </div>
      </div>
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
          aria-label="Inspiration food images"
        >
          {props.ingredients?.map((ingredient) => {
            return (
              <SplideSlide key={ingredient.id}>
                <div className={classes.slider_item} key={ingredient.id}>
                  <div className={classes.ingredient_img}>
                    <img
                      src={
                        imageURL + ingredient.image ||
                        require("../../Images/Logos/default.jpg")
                      }
                      alt={ingredient.name}
                    />
                  </div>
                  <p>{ingredient.name}</p>
                  <span>{`${calculateAmount(
                    ingredient.measures.metric.amount
                  )} ${ingredient.measures.metric.unitShort || "qty"}`}</span>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};

export default IngredientSlider;
