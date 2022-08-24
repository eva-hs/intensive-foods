import http from "../services/httpService";
import auth from "../services/authService";
import config from "../config.json";

async function register(user) {
  const data = {
    name: user.name,
    email: user.username,
    password: user.password,
  };
  const { headers } = await http.post(config.apiEndpointUsers, data);
  auth.loginWithJwt(headers["x-auth-token"]);
}

const user = {
  register,
};

export default user;
