import httpService from "../services/httpService";
import config from "../config.json";

const TOKEN_KEY = "token";

async function login(user) {
  const data = {
    email: user.username,
    password: user.password,
  };
  const { data: jwt } = await httpService.post(config.apiEndpointAuth, data);
  localStorage.setItem(TOKEN_KEY, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(TOKEN_KEY, jwt);
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
}

const auth = {
  login,
  loginWithJwt,
  logout,
  getJwt,
};

export default auth;
