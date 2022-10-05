import React, { useContext } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import MainHeader from "../MainHeader/MainHeader";
import Footer from "../Footer/Footer";
import { ClipLoader } from "react-spinners";
import illustration from "../../Images/Illustrations/illustration3.jpg";
import classes from "./RecipeContainer.module.css";
import BookmarkContext from "../Context/BookmarkContextProvider";

const getRecipes = (recipes, bookmarkRecipes) => {
  if (bookmarkRecipes.length > 0 && recipes.length > 0) {
    const updatedRecipes = recipes.map((recipe) => {
      for (let bookmark of bookmarkRecipes) {
        if (recipe.id === bookmark.id) {
          return { ...recipe, isBookmarked: true };
        }
      }

      return { ...recipe, isBookmarked: false };
    });

    return updatedRecipes;
  }

  return recipes;
};

const RecipeContainer = (props) => {
  const { bookmarkItems } = useContext(BookmarkContext);

  let content = (
    <div className={classes.no_data}>
      <img src={illustration} alt="illustration" />
      <h3>{props.message || "No Recipes Found!"}</h3>
    </div>
  );

  if (props.isLoading) {
    content = (
      <div className={classes.loading}>
        <ClipLoader size={45} color="#000" />
        <p>Loading...</p>
      </div>
    );
  }

  if (props.recipes.length > 0) {
    // get Recipes
    const updatedRecipes = getRecipes(props.recipes, bookmarkItems);

    content = (
      <div className={classes.grid_container}>
        {updatedRecipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image || ""}
              likes={recipe.aggregateLikes}
              cuisines={recipe.cuisines}
              dishTypes={recipe.dishTypes}
              readyInMinutes={recipe.readyInMinutes}
              servings={recipe.servings}
              isBookmarked={recipe.isBookmarked || false}
            />
          );
        })}
      </div>
    );
  }

  return (
    <React.Fragment>
      <MainHeader />
      <div className={classes.recipe_container}>
        <h2>
          <span>{props.title}</span> Recipes
        </h2>
        {content}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default RecipeContainer;
