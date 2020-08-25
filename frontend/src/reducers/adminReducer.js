import * as adminActions from "../actions/adminActions";

const INITIAL_STATE = {
  projects: {},
};

function adminReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case adminActions.SHOW_PROJECTS:
      return { ...state, projects: action.payload };
    default:
      return state;
  }
}

export default adminReducer;
