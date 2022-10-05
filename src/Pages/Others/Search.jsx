import React, { useState, useEffect, useCallback } from "react";
import RecipeContainer from "../../components/UI/RecipeContainer";
import getRecipeInformation from "../../Helper/recipe-info";
import { useParams } from "react-router-dom";
import useHttp from "../../components/Hooks/use-http";
import { REACT_APP_API_KEY } from "../../Helper/config";

const Search = () => {
  const { query } = useParams();
  const [searchRecipes, setSearchRecipes] = useState([]);
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
      setSearchRecipes(recipes);

      // 5) Store this recipes into local storage.

      const localData = {
        ...JSON.parse(localStorage.getItem("recipes")),
        searchRecipes: {
          ...JSON.parse(localStorage.getItem("recipes"))?.searchRecipes,
        },
      };

      localData.searchRecipes[query] = recipes;
      localStorage.setItem("recipes", JSON.stringify(localData));
    },
    [query]
  );

  useEffect(() => {
    const localSearchRecipes = JSON.parse(
      localStorage.getItem("recipes")
    )?.searchRecipes;

    if (localSearchRecipes && localSearchRecipes[query]?.length > 0) {
      console.log("LOCAL!");
      setSearchRecipes(localSearchRecipes[query]);
    } else {
      sendRequest(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_API_KEY}&query=${query}&number=9`,
        transformData
      );
    }
  }, [query, sendRequest, transformData]);

  return (
    <React.Fragment>
      <RecipeContainer
        isLoading={isLoading}
        recipes={searchRecipes}
        title={query}
        message={`No match found for ${query}.`}
      />
    </React.Fragment>
  );
};

export default Search;

// useEffect(() => {
//   const localSearchRecipes = JSON.parse(
//     localStorage.getItem("recipes")
//   )?.searchRecipes;

//   if (localSearchRecipes && localSearchRecipes[query]?.length > 0) {
//     console.log("LOCAL!");
//     setSearchRecipes(localSearchRecipes[query]);
//   } else {
//     getSearchRecipes();
//   }
// }, [query]);

// const getSearchRecipes = async () => {
//   setIsLoading(true);

//   try {
//     // 1) Search request for given query
//     const response = await fetch(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}&number=1`
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
//     setSearchRecipes(recipes);

//     // 6) Store this recipes into local storage.

//     const localData = {
//       ...JSON.parse(localStorage.getItem("recipes")),
//       searchRecipes: {
//         ...JSON.parse(localStorage.getItem("recipes"))?.searchRecipes,
//       },
//     };

//     localData.searchRecipes[query] = recipes;

//     localStorage.setItem("recipes", JSON.stringify(localData));
//   } catch (err) {
//     console.error(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };
