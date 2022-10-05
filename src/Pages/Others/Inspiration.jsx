import React, { useState, useEffect, useCallback } from "react";
import RecipeContainer from "../../components/UI/RecipeContainer";
import getRecipeInformation from "../../Helper/recipe-info";
import { useParams } from "react-router-dom";
import useHttp from "../../components/Hooks/use-http";
import { REACT_APP_API_KEY } from "../../Helper/config";

const Inspiration = () => {
  const { foodName } = useParams();
  const [inspirationRecipes, setInspirationRecipes] = useState([]);
  const { isLoading, sendRequest } = useHttp();

  // function to transform response data of inspiration recipes.
  const transformData = useCallback(
    async (data) => {
      // 1) Get results data from data.
      const { results } = data;

      // 2) Get all recipe Id from results.
      const recipesId = results.map((item) => item.id);

      // 3) Get all recipes information from their ids.
      const recipes = await getRecipeInformation(recipesId);

      // 4) Update state
      setInspirationRecipes(recipes);

      // 5) Store this recipes into local storage.

      const localData = {
        ...JSON.parse(localStorage.getItem("recipes")),
        inspirationRecipes: {
          ...JSON.parse(localStorage.getItem("recipes"))?.inspirationRecipes,
        },
      };

      localData.inspirationRecipes[foodName] = recipes;
      localStorage.setItem("recipes", JSON.stringify(localData));
    },
    [foodName]
  );

  useEffect(() => {
    const localInspirationRecipes = JSON.parse(
      localStorage.getItem("recipes")
    )?.inspirationRecipes;

    if (
      localInspirationRecipes &&
      localInspirationRecipes[foodName]?.length > 0
    ) {
      console.log("LOCAL!");
      setInspirationRecipes(localInspirationRecipes[foodName]);
    } else {
      sendRequest(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_API_KEY}&query=${foodName}&number=9`,
        transformData
      );
    }
  }, [foodName, sendRequest, transformData]);

  return (
    <React.Fragment>
      <RecipeContainer
        isLoading={isLoading}
        recipes={inspirationRecipes}
        title={foodName}
      />
    </React.Fragment>
  );
};

export default Inspiration;

// useEffect(() => {
//   const localInspirationRecipes = JSON.parse(
//     localStorage.getItem("recipes")
//   )?.inspirationRecipes;

//   if (
//     localInspirationRecipes &&
//     localInspirationRecipes[foodName]?.length > 0
//   ) {
//     console.log("LOCAL");
//     setInspirationRecipes(localInspirationRecipes[foodName]);
//   } else {
//     getInspirationRecipes();
//   }
// }, [foodName]);

// const getInspirationRecipes = async () => {
//   setIsLoading(true);

//   try {
//     // 1) Search request for given query
//     const response = await fetch(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${foodName}&number=1`
//     );

//     if (!response.ok) {
//       throw new Error("Request failed!");
//     }

//     // 2) Get results data from response.
//     const { results } = await response.json();

//     // 3) Get all recipe Id from results.
//     const recipesId = results.map((item) => item.id);

//     // 4) Get all recipes information from their ids.
//     const recipes = await getRecipeInformation(recipesId);

//     // 5) Update state
//     setInspirationRecipes(recipes);

//     // 6) Store this recipes into local storage.

//     const localData = {
//       ...JSON.parse(localStorage.getItem("recipes")),
//       inspirationRecipes: {
//         ...JSON.parse(localStorage.getItem("recipes"))?.inspirationRecipes,
//       },
//     };

//     localData.inspirationRecipes[foodName] = recipes;

//     localStorage.setItem("recipes", JSON.stringify(localData));
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };
