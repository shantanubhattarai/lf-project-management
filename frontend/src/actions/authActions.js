import * as httpUtils from "../utils/http";
import * as config from "../configs/appconfig";

export const LOGIN = "LOGIN";
export const REDIRECT = "REDIRECT";
export const ERROR = "ERROR";
export const LOGOUT = "LOGOUT";
export const ADD_USER = "ADD_USER";

export function Login(username, password) {
  return function action(dispatch) {
    return httpUtils
      .post(config.endPoints.login, { username, password })
      .then((response) => {
        if (response.status === 400) {
          dispatch(Error(response.message));
        } else if (response.status === 200) {
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("user", JSON.stringify({ ...response }));
          dispatch({ type: LOGIN, payload: { ...response } });
          dispatch(Redirect("/projects"));
          window.location.reload(false);
        }
      });
  };
}

export function AddUser(body) {
  return function action(dispatch) {
    return httpUtils
      .post(config.endPoints.addUser, { ...body })
      .then((response) => {
        if (response.status === 400) {
          dispatch(Error(response.message));
        } else if (response.status === 200) {
          dispatch({ type: ADD_USER });
        }
      });
  };
}

export function Logout(dispatch) {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT });
  window.location.reload(false);
}

export function Error(error) {
  return { type: ERROR, payload: error };
}

export function Redirect(value) {
  return { type: REDIRECT, payload: value };
}
