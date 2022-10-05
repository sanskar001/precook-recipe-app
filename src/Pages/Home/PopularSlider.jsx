import React, { useCallback, useContext, useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import classes from "./PopularSlider.module.css";
import BookmarkContext from "../../components/Context/BookmarkContextProvider";
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

const PopularSlider = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const { bookmarkItems } = useContext(BookmarkContext);

  const { isLoading, sendRequest } = useHttp();

  // function to transform response data of popular recipes.
  const transformData = useCallback((data) => {
    const { recipes } = data;

    // Update state
    setPopularRecipes(recipes);

    // Store this recipes into local storage.
    localStorage.setItem(
      "recipes",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("recipes")),
        popularRecipes: recipes,
      })
    );
  }, []);

  useEffect(() => {
    const localPopularRecipes = JSON.parse(
      localStorage.getItem("recipes")
    )?.popularRecipes;

    if (localPopularRecipes?.length > 0) {
      console.log("LOCAL!");
      setPopularRecipes(localPopularRecipes);
    } else {
      sendRequest(
        `https://api.spoonacular.com/recipes/random?apiKey=${REACT_APP_API_KEY}&number=6&limitLicense=true`,
        transformData
      );
    }
  }, [sendRequest, transformData]);

  // get Recipes
  const updatedRecipes = getRecipes(popularRecipes, bookmarkItems);

  return (
    <div className={classes.popular_slider}>
      <h3>Popular recipes</h3>
      {isLoading && (
        <div className={classes.loading}>
          <ClipLoader size={45} color="#000" />
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && (
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

export default PopularSlider;

// useEffect(() => {
//   const localPopularRecipes = JSON.parse(
//     localStorage.getItem("recipes")
//   )?.popularRecipes;

//   if (localPopularRecipes?.length > 0) {
//     setPopularRecipes(localPopularRecipes);
//   } else {
//     getPopularRecipes();
//   }
// }, []);

// const getPopularRecipes = async () => {
//   try {
//     const response = await fetch(
//       `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&limitLicense=true`
//     );

//     if (!response.ok) {
//       throw new Error("Request failed!");
//     }

//     const { recipes } = await response.json();

//     // Update state
//     setPopularRecipes(recipes);

//     // Store this recipes into local storage.
//     localStorage.setItem(
//       "recipes",
//       JSON.stringify({
//         ...JSON.parse(localStorage.getItem("recipes")),
//         popularRecipes: recipes,
//       })
//     );
//   } catch (err) {
//     alert(err.message);
//   }
// };
