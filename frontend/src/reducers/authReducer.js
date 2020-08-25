import * as authActions from "../actions/authActions";

const INITIAL_STATE = {
  user: {},
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case authActions.LOGIN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default authReducer;
