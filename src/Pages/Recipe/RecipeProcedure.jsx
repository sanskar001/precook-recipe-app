import React from "react";
import classes from "./RecipeProcedure.module.css";

const RecipeProcedure = (props) => {
  const imageUrl = `https://spoonacular.com/recipeImages/${props.id}-636x393.jpg`;

  // Getting steps out of instructions.
  const steps = props.instructions?.flatMap((item) => item.steps);

  return (
    <div className={classes.recipe_procedure}>
      <h3>Procedure</h3>
      <img
        src={imageUrl || require("../../Images/Logos/default.jpg")}
        alt="recipe food"
      />
      <div className={classes.instruction}>
        {steps.map((step, index) => {
          return (
            <div className={classes.step} key={index}>
              <span className={classes.count}>{index + 1}</span>
              <p>{step.step}.</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeProcedure;
