import * as httpUtils from "../utils/http";
import * as config from "../configs/appconfig";

export const SHOW_TASK = "SHOW_PROJECTS";
export const SHOW_TASK_COMMENTS = "SHOW_TASK_COMMENTS";
export const GET_ASSIGNED_USER = "GET_ASSIGNED_USER";
export const SET_EDIT_TASK_DETAILS = "SET_EDIT_TASK_DETAILS";
export const SET_TITLE = "SET_TITLE";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_ASSIGNED_USER = "SET_ASSIGNED_USER";
export const SET_PROJECT = "SET_PROJECT";

export function showTask(taskId) {
  return (dispatch) => {
    return httpUtils
      .get(config.endPoints.taskDetails + `/${taskId}`)
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          dispatch({ type: SHOW_TASK, payload: response.data });
          return true;
        }
      });
  };
}

export function getAssignedUser(taskId) {
  return function action(dispatch) {
    return httpUtils
      .get(config.endPoints.taskUser + `/${taskId}`)
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          dispatch({ type: GET_ASSIGNED_USER, payload: response.data });
        }
      });
  };
}

export function setTitle(value) {
  return { type: SET_TITLE, payload: value };
}

export function setDescription(value) {
  return { type: SET_DESCRIPTION, payload: value };
}

export function setAssignedUser(value) {
  return { type: SET_ASSIGNED_USER, payload: value };
}

export function setProject(value) {
  return { type: SET_PROJECT, payload: value };
}

export function updateTask(id, title, description, assignedUser, project) {
  return function action(dispatch) {
    return httpUtils
      .put(config.endPoints.taskUpdate, {
        id,
        title,
        description,
        assignedUser,
        project,
      })
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message, response.error);
        } else if (response.status === 200) {
          console.log(response.message);
          dispatch(showTask(id));
        }
      });
  };
}
