import axios from "axios";
export const getRecipes = async (query: string) => {
  return await axios.get(
    `https://api.edamam.com/api/recipes/v2/?type=public&q=${query}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
  );
};

export const getNextPage = async (url: string) => {
  return await axios.get(url);
};
