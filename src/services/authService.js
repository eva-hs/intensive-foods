import httpService from "../services/httpService";
import config from "../config.json";

function login(user) {
  const data = {
    email: user.username,
    password: user.password,
  };
  return httpService.post(config.apiEndpointAuth, data);
}

const auth = {
  login,
};

export default auth;
