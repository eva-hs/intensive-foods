import http from "./httpService";
import config from "../config.json";

function getCategories() {
  return http.get(config.apiEndpointCategories);
}

function getFoods() {
  return http.get(config.apiEndpointFoods);
}

function deleteFood(food) {
  http.delete(`${config.apiEndpointFoods}/${food._id}`);
}

const food = {
  getCategories,
  getFoods,
  deleteFood,
};

export default food;
