import * as httpUtils from "../utils/http";
import * as config from "../configs/appconfig";

export const LOGIN = "LOGIN";

export function Login(username, password) {
  return function action(dispatch) {
    dispatch({ type: LOGIN, payload: { username, password } });
    return httpUtils
      .post(config.endPoints.login, { username, password })
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          console.log("success");
          //store token in local storage
          //redirect
        }
      });
  };
}
