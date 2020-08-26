import * as httpUtils from "../utils/http";
import * as config from "../configs/appconfig";

export const LOGIN = "LOGIN";
export const REDIRECT = "REDIRECT";
export const ERROR = "ERROR";
export const LOGOUT = "LOGOUT";

export function Login(username, password) {
  return function action(dispatch) {
    return httpUtils
      .post(config.endPoints.login, { username, password })
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("user", JSON.stringify({ ...response }));
          dispatch({ type: LOGIN, payload: { ...response } });
          dispatch(Redirect(true));
        }
      });
  };
}

export function Logout() {
  return function action(dispatch) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return dispatch({ type: LOGOUT });
  };
}

export function Redirect(value) {
  return { type: REDIRECT, payload: value };
}
