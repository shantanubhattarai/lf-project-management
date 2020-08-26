import * as authActions from "../actions/authActions";

const INITIAL_STATE = {
  redirect: false,
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
    default:
      return state;
  }
}

export default authReducer;
