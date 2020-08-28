import * as taskActions from "../actions/taskActions";
import * as authActions from "../actions/authActions";

const INITIAL_STATE = {
  currentTask: {},
  currentEditTaskDetails: {
    title: "",
    description: "",
    assignedUser: "",
    project: "",
  },
  comments: {},
  assignedUser: {},
  redirect: "",
};

function projectReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case taskActions.SHOW_TASK:
      return {
        ...state,
        currentTask: action.payload,
        currentEditTaskDetails: action.payload,
      };
    case taskActions.SHOW_TASK_COMMENTS:
      return { ...state, comments: action.payload };
    case taskActions.GET_ASSIGNED_USER:
      return { ...state, assignedUser: action.payload };
    case taskActions.ADD_TASK:
      return { ...state };
    case taskActions.SET_TITLE:
      return {
        ...state,
        currentEditTaskDetails: {
          ...state.currentEditTaskDetails,
          title: action.payload,
        },
      };
    case taskActions.SET_DESCRIPTION:
      return {
        ...state,
        currentEditTaskDetails: {
          ...state.currentEditTaskDetails,
          description: action.payload,
        },
      };
    case taskActions.SET_ASSIGNED_USER:
      return {
        ...state,
        currentEditTaskDetails: {
          ...state.currentEditTaskDetails,
          assigned_user: action.payload,
        },
      };
    case taskActions.SET_PROJECT:
      return {
        ...state,
        currentEditTaskDetails: {
          ...state.currentEditTaskDetails,
          project: action.payload,
        },
      };
    case authActions.LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

export default projectReducer;
