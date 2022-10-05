import React, { useEffect, useState, useCallback } from "react";
import RecipeContainer from "../../components/UI/RecipeContainer";
import { useParams } from "react-router-dom";
import useHttp from "../../components/Hooks/use-http";
import { REACT_APP_API_KEY } from "../../Helper/config";

const Cuisine = () => {
  const { type } = useParams();
  const [cuisineRecipes, setCuisineRecipes] = useState([]);
  const { isLoading, sendRequest } = useHttp();

  // function to transform response data of popular recipes.
  const transformData = useCallback(
    (data) => {
      const { recipes } = data;

      // Update state
      setCuisineRecipes(recipes);

      // Store this recipes into local storage.
      const localData = {
        ...JSON.parse(localStorage.getItem("recipes")),
        cuisineRecipes: {
          ...JSON.parse(localStorage.getItem("recipes"))?.cuisineRecipes,
        },
      };

      localData.cuisineRecipes[type] = recipes;
      localStorage.setItem("recipes", JSON.stringify(localData));
    },
    [type]
  );

  useEffect(() => {
    const localCuisineRecipes = JSON.parse(
      localStorage.getItem("recipes")
    )?.cuisineRecipes;

    if (localCuisineRecipes && localCuisineRecipes[type]?.length > 0) {
      console.log("LOCAL!");
      setCuisineRecipes(localCuisineRecipes[type]);
    } else {
      sendRequest(
        `https://api.spoonacular.com/recipes/random?apiKey=${REACT_APP_API_KEY}&tag=${type}&number=9&limitLicense=true`,
        transformData
      );
    }
  }, [type, sendRequest, transformData]);

  return (
    <React.Fragment>
      <RecipeContainer
        isLoading={isLoading}
        recipes={cuisineRecipes}
        title={type}
      />
    </React.Fragment>
  );
};

export default Cuisine;

// useEffect(() => {
//   const localCuisineRecipes = JSON.parse(
//     localStorage.getItem("recipes")
//   )?.cuisineRecipes;

//   if (localCuisineRecipes && localCuisineRecipes[type]?.length > 0) {
//     console.log("LOCAL!");
//     setCuisineRecipes(localCuisineRecipes[type]);
//   } else {
//     getCuisineRecipes();
//   }
// }, [type]);

// const getCuisineRecipes = async () => {
//   setIsLoading(true);

//   try {
//     // 1) Search request for given query
//     const response = await fetch(
//       `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tag=${type}&number=1&limitLicense=true`
//     );

//     if (!response.ok) {
//       throw new Error("Request failed!");
//     }

//     // 2) Get results data from response.
//     const { recipes } = await response.json();

//     // 3) Update state
//     setCuisineRecipes(recipes);

//     // 4) Store this recipes into local storage.
//     const localData = {
//       ...JSON.parse(localStorage.getItem("recipes")),
//       cuisineRecipes: {
//         ...JSON.parse(localStorage.getItem("recipes"))?.cuisineRecipes,
//       },
//     };

//     localData.cuisineRecipes[type] = recipes;

//     localStorage.setItem("recipes", JSON.stringify(localData));
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };
