import httpService from "../services/httpService";
import config from "../config.json";

export function register(user) {
  const data = {
    name: user.name,
    email: user.username,
    password: user.password,
  };
  return httpService.post(config.apiEndpointUsers, data);
}

export default {
  register,
};
