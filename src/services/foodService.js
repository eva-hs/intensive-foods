import http from "./httpService";
import config from "../config.json";

export function getFoods() {
  return http.get(config.apiEndpointFoods);
}

export function deleteFood(food) {
  http.delete(`${config.apiEndpointFoods}/${food._id}`);
}

const food = {
  getFoods,
  deleteFood,
};

export default food;
