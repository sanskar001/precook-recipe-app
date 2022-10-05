import React, { useState, useEffect, useContext } from "react";
import RecipeHeader from "./RecipeHeader";
import classes from "./Recipe.module.css";
import IngredientSlider from "./IngredientSlider";
import RecipeProcedure from "./RecipeProcedure";
import Nutrition from "./Nutrition";
import SimilarRecipe from "./SimilarRecipe";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import BookmarkContext from "../../components/Context/BookmarkContextProvider";
import useHttp from "../../components/Hooks/use-http";
import { REACT_APP_API_KEY } from "../../Helper/config";

const getRecipeInfo = (recipe, bookmarkRecipes) => {
  if (bookmarkRecipes.length > 0 && recipe) {
    for (let bookmark of bookmarkRecipes) {
      if (recipe.id === bookmark.id) {
        return { ...recipe, isBookmarked: true };
      }
    }
  }

  return { ...recipe, isBookmarked: false };
};

const Recipe = () => {
  const { id } = useParams();
  const [recipeInfo, setRecipeInfo] = useState(null);
  const { bookmarkItems } = useContext(BookmarkContext);
  const { isLoading, sendRequest } = useHttp();

  useEffect(() => {
    const transformData = (data) => {
      setRecipeInfo(data);
    };

    sendRequest(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${REACT_APP_API_KEY}&includeNutrition=true`,
      transformData
    );
  }, [sendRequest, id]);

  // Get Updated Recipe
  const updatedRecipeInfo = getRecipeInfo(recipeInfo, bookmarkItems);

  return (
    <React.Fragment>
      <MainHeader />
      <div className={classes.recipe}>
        {isLoading && (
          <div className={classes.loading}>
            <ClipLoader size={45} color="#000" />
            <p>Loading...</p>
          </div>
        )}
        {!isLoading && recipeInfo && (
          <React.Fragment>
            <RecipeHeader
              id={updatedRecipeInfo.id}
              title={updatedRecipeInfo.title}
              image={updatedRecipeInfo.image}
              likes={updatedRecipeInfo.aggregateLikes}
              cuisines={updatedRecipeInfo.cuisines}
              dishTypes={updatedRecipeInfo.dishTypes}
              readyInMinutes={updatedRecipeInfo.readyInMinutes}
              servings={updatedRecipeInfo.servings}
              isBookmarked={updatedRecipeInfo.isBookmarked || false}
            />
            <main>
              <IngredientSlider
                ingredients={updatedRecipeInfo.extendedIngredients}
                servings={updatedRecipeInfo.servings}
              />
              <RecipeProcedure
                instructions={updatedRecipeInfo.analyzedInstructions}
                id={updatedRecipeInfo.id}
              />
              <Nutrition nutrition={updatedRecipeInfo.nutrition} />
              <SimilarRecipe id={updatedRecipeInfo.id} />
            </main>
          </React.Fragment>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Recipe;

// useEffect(() => {
//   getRecipeInformation();
// }, []);

// const getRecipeInformation = async () => {
//   setIsLoading(true);

//   try {
//     const response = await fetch(
//       `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=true`
//     );

//     if (!response.ok) {
//       throw new Error("Request failed!");
//     }

//     const data = await response.json();

//     // Update state
//     setRecipeInfo(data);
//   } catch (err) {
//     alert(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };
