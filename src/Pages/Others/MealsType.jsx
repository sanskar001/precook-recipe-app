import React, { useEffect, useState, useCallback } from "react";
import RecipeContainer from "../../components/UI/RecipeContainer";
import { useParams } from "react-router-dom";
import useHttp from "../../components/Hooks/use-http";
import { REACT_APP_API_KEY } from "../../Helper/config";

const MealsType = () => {
  const { type } = useParams();
  const [mealTypeRecipes, setMealTypeRecipes] = useState([]);
  const { isLoading, sendRequest } = useHttp();

  // function to transform response data of popular recipes.
  const transformData = useCallback(
    (data) => {
      const { recipes } = data;

      console.log(recipes);

      // Update state
      setMealTypeRecipes(recipes);

      // Store this recipes into local storage.
      const localData = {
        ...JSON.parse(localStorage.getItem("recipes")),
        mealTypeRecipes: {
          ...JSON.parse(localStorage.getItem("recipes"))?.mealTypeRecipes,
        },
      };

      localData.mealTypeRecipes[type] = recipes;
      localStorage.setItem("recipes", JSON.stringify(localData));
    },
    [type]
  );

  useEffect(() => {
    const localMealTypeRecipes = JSON.parse(
      localStorage.getItem("recipes")
    )?.mealTypeRecipes;

    if (localMealTypeRecipes && localMealTypeRecipes[type]?.length > 0) {
      console.log("LOCAL!");
      setMealTypeRecipes(localMealTypeRecipes[type]);
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
        recipes={mealTypeRecipes}
        title={type}
      />
    </React.Fragment>
  );
};

export default MealsType;

// useEffect(() => {
//   const localMealTypeRecipes = JSON.parse(
//     localStorage.getItem("recipes")
//   )?.mealTypeRecipes;

//   if (localMealTypeRecipes && localMealTypeRecipes[type]?.length > 0) {
//     console.log("LOCAL!");
//     setMealTypeRecipes(localMealTypeRecipes[type]);
//   } else {
//     getMealTypeRecipes();
//   }
// }, [type]);

// const getMealTypeRecipes = async () => {
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
//     setMealTypeRecipes(recipes);

//     // 4) Store this recipes into local storage.
//     const localData = {
//       ...JSON.parse(localStorage.getItem("recipes")),
//       mealTypeRecipes: {
//         ...JSON.parse(localStorage.getItem("recipes"))?.mealTypeRecipes,
//       },
//     };

//     localData.mealTypeRecipes[type] = recipes;

//     localStorage.setItem("recipes", JSON.stringify(localData));
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };
