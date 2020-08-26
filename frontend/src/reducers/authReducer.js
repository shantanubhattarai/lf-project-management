import * as authActions from "../actions/authActions";

const INITIAL_STATE = {
  redirect: "",
  error: "",
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case authActions.LOGIN:
      return { ...state };
    case authActions.REDIRECT:
      return { ...state, redirect: action.payload };
    case authActions.LOGOUT:
      return { ...state };
    case authActions.ERROR:
      return { ...state, error: action.payload };
    case authActions.ADD_USER:
      return { ...state };
    default:
      return state;
  }
}

export default authReducer;
