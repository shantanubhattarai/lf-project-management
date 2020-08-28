import * as projectActions from "../actions/projectActions";
import * as authActions from "../actions/authActions";

const INITIAL_STATE = {
  projects: {},
  currentProject: {},
  tasks: {},
  users: [],
  message: "",
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
    case projectActions.GET_PROJECT_USERS:
      return { ...state, users: action.payload };
    case projectActions.ASSIGN_USER:
      return { ...state, message: action.payload };
    case authActions.LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

export default projectReducer;
