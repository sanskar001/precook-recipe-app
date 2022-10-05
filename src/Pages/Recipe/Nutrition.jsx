import React from "react";
import caloriesIcon from "../../Images/Icons/calories-icon.svg";
import fatIcon from "../../Images/Icons/fat-icon.svg";
import protienIcon from "../../Images/Icons/protien-icon.svg";
import carbohydrateIcon from "../../Images/Icons/carbohydrate-icon.svg";
import classes from "./Nutrition.module.css";

const Nutrition = (props) => {
  const nutrients = props.nutrition?.nutrients;

  const calories = nutrients?.find((item) => item.name === "Calories");
  const fat = nutrients?.find((item) => item.name === "Fat");
  const protien = nutrients?.find((item) => item.name === "Protein");
  const carbohydrates = nutrients?.find(
    (item) => item.name === "Carbohydrates"
  );

  return (
    <div className={classes.nutrition}>
      <h3>Nutrition</h3>
      <div className={classes.card}>
        <div className={classes.item}>
          <p>calories</p>
          <img src={caloriesIcon} alt="calories icon" />
          <p className={classes.value}>
            <span>{calories.amount}</span>
            <span>{calories.unit}</span>
          </p>
        </div>
        <div className={classes.item}>
          <p>fat</p>
          <img src={fatIcon} alt="fat icon" />
          <p className={classes.value}>
            <span>{fat.amount}</span>
            <span>{fat.unit}</span>
          </p>
        </div>
        <div className={classes.item}>
          <p>protien</p>
          <img src={protienIcon} alt="protien icon" />
          <p className={classes.value}>
            <span>{protien.amount}</span>
            <span>{protien.unit}</span>
          </p>
        </div>
        <div className={classes.item}>
          <p>carbohydrate</p>
          <img src={carbohydrateIcon} alt="carbohydrate icon" />
          <p className={classes.value}>
            <span>{carbohydrates.amount}</span>
            <span>{carbohydrates.unit}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
