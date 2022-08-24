import httpService from "../services/httpService";
import config from "../config.json";

function register(user) {
  const data = {
    name: user.name,
    email: user.username,
    password: user.password,
  };
  return httpService.post(config.apiEndpointUsers, data);
}

const user = {
  register,
};

export default user;
