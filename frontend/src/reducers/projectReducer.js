import * as projectActions from "../actions/projectActions";

const INITIAL_STATE = {
  projects: {},
};

function projectReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case projectActions.SHOW_PROJECTS:
      return { ...state, projects: action.payload };
    default:
      return state;
  }
}

export default projectReducer;
