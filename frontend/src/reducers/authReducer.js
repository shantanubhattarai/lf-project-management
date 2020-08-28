import * as authActions from "../actions/authActions";

const INITIAL_STATE = {
  redirect: "",
  error: "",
  message: "",
  roles: [],
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case authActions.LOGIN:
      return { ...state, message: action.payload };
    case authActions.REDIRECT:
      return { ...state, redirect: action.payload };
    case authActions.LOGOUT:
      return { ...INITIAL_STATE };
    case authActions.ERROR:
      return { ...state, error: action.payload };
    case authActions.ADD_USER:
      return { ...state, message: action.payload };
    case authActions.GET_ROLES:
      return { ...state, roles: action.payload };
    default:
      return state;
  }
}

export default authReducer;
