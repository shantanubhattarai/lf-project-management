import * as projectActions from "../actions/projectActions";

const INITIAL_STATE = {
  projects: {},
  currentProject: {},
  tasks: {},
};

function projectReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case projectActions.SHOW_PROJECTS:
      return { ...state, projects: action.payload };
    case projectActions.SHOW_PROJECT_DETAILS:
      return { ...state, currentProject: action.payload };
    case projectActions.SHOW_PROJECT_TASKS:
      return { ...state, tasks: action.payload };
    case projectActions.ADD_PROJECT:
      return { ...state };
    default:
      return state;
  }
}

export default projectReducer;
