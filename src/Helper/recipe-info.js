import { REACT_APP_API_KEY } from "../Helper/config";

const getRecipeInformation = async (recipeIdList) => {
  // function to get JSON data of api search request.
  const getJSON = async (id) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${REACT_APP_API_KEY}`
    );

    return response.json();
  };

  try {
    // const data = await Promise.all(recipeIdList.map((id) => getJSON(id)));
    const result = await Promise.allSettled(
      recipeIdList.map((id) => getJSON(id))
    );

    const data = [];

    result.forEach((item) => {
      if (item.status === "rejected" || item.value?.status === "failure") {
      } else {
        data.push(item.value);
      }
    });

    return data;
  } catch (err) {
    alert(err.message);
  }
};

export default getRecipeInformation;
