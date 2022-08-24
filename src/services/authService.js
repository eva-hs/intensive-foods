import jwtDecode from "jwt-decode";
import httpService from "../services/httpService";
import config from "../config.json";

const TOKEN_KEY = "token";

httpService.setAuthHeader(getJwt());

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

function getCurrentUser() {
  try {
    const token = getJwt();
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
}

const auth = {
  login,
  loginWithJwt,
  logout,
  getJwt,
  getCurrentUser,
};

export default auth;
