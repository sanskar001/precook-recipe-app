import React, { useContext, useEffect, useState, useCallback } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import classes from "./SimilarRecipe.module.css";
import BookmarkContext from "../../components/Context/BookmarkContextProvider";
import getRecipeInformation from "../../Helper/recipe-info";
import useHttp from "../../components/Hooks/use-http";
import { ClipLoader } from "react-spinners";
import { REACT_APP_API_KEY } from "../../Helper/config";

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

const SimilarRecipe = (props) => {
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const { bookmarkItems } = useContext(BookmarkContext);
  const { isLoading, sendRequest } = useHttp();

  // function to transform response data of popular recipes.
  const transformData = useCallback(
    async (data) => {
      // 1) Get all recipe Id from data.
      const recipesId = data.map((item) => item.id);

      // 2) Get all recipes information from their ids.
      const recipes = await getRecipeInformation(recipesId);

      // 3) Update state
      setSimilarRecipes(recipes);

      // 4) Store this recipes into local storage.

      const localData = {
        ...JSON.parse(localStorage.getItem("recipes")),
        similarRecipes: {
          ...JSON.parse(localStorage.getItem("recipes"))?.similarRecipes,
        },
      };

      localData.similarRecipes[`${props.id}`] = recipes;
      localStorage.setItem("recipes", JSON.stringify(localData));
    },
    [props.id]
  );

  useEffect(() => {
    const localSimilarRecipes = JSON.parse(
      localStorage.getItem("recipes")
    )?.similarRecipes;

    if (localSimilarRecipes && localSimilarRecipes[`${props.id}`]?.length > 0) {
      console.log("LOCAL!");
      setSimilarRecipes(localSimilarRecipes[`${props.id}`]);
    } else {
      sendRequest(
        `https://api.spoonacular.com/recipes/${props.id}/similar?apiKey=${REACT_APP_API_KEY}&number=4`,
        transformData
      );
    }
  }, [props.id, sendRequest, transformData]);

  // get Recipes
  const updatedRecipes = getRecipes(similarRecipes, bookmarkItems);

  return (
    <div className={classes.similar_recipe_slider}>
      <h3>Similar recipes</h3>
      {isLoading && (
        <div className={classes.loading}>
          <ClipLoader size={45} color="#000" />
          <p>Loading...</p>
        </div>
      )}
      {updatedRecipes.length > 0 && (
        <div className={classes.slider_container}>
          <Splide
            options={{
              autoWidth: true,
              pagination: false,
              arrows: true,
              type: "loop",
              perPage: 3,
              perMove: 1,
              focus: "center",
              gap: "-0.5rem",
              drag: "free",
            }}
            aria-label="Popular recipes"
          >
            {updatedRecipes.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
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
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      )}
    </div>
  );
};

export default SimilarRecipe;

// useEffect(() => {
//   const localSimilarRecipes = JSON.parse(
//     localStorage.getItem("recipes")
//   )?.similarRecipes;

//   if (localSimilarRecipes && localSimilarRecipes[`${props.id}`]?.length > 0) {
//     console.log("LOCAL");
//     setSimilarRecipes(localSimilarRecipes[`${props.id}`]);
//   } else {
//     getSimilarRecipes(props.id);
//   }
// }, [props.id]);

// const getSimilarRecipes = async (id) => {
//   try {
//     // 1) Similar recipes request for given id
//     const response = await fetch(
//       `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.REACT_APP_API_KEY}&number=3`
//     );

//     if (!response.ok) {
//       throw new Error("Request failed!");
//     }

//     // 2) Get results data from response.
//     const results = await response.json();

//     // 3) Get all recipe Id from results.
//     const recipesId = results.map((item) => item.id);

//     // 4) Get all recipes information from their ids.
//     const recipes = await getRecipeInformation(recipesId);

//     // Update state
//     setSimilarRecipes(recipes);

//     // 6) Store this recipes into local storage.

//     const localData = {
//       ...JSON.parse(localStorage.getItem("recipes")),
//       similarRecipes: {
//         ...JSON.parse(localStorage.getItem("recipes"))?.similarRecipes,
//       },
//     };

//     localData.similarRecipes[`${props.id}`] = recipes;

//     localStorage.setItem("recipes", JSON.stringify(localData));
//   } catch (err) {
//     alert(err.message);
//   }
// };
