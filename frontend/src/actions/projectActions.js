import * as httpUtils from "../utils/http";
import * as config from "../configs/appconfig";
import { EMPTY_TASK } from "./taskActions";

export const SHOW_PROJECTS = "SHOW_PROJECTS";
export const SHOW_PROJECT_DETAILS = "SHOW_PROJECT_DETAILS";
export const SHOW_PROJECT_TASKS = "SHOW_PROJECT_TASKS";
export const ADD_PROJECT = "ADD_PROJECT";
export const GET_PROJECT_USERS = "GET_PROJECT_USERS";
export const ASSIGN_USER = "ASSIGN_USER";
export const DELETE_PROJECT = "DELETE_PROJECT";
export const REMOVE_TASK = "REMOVE_TASK";

export function getUsers() {
  return function action(dispatch) {
    return httpUtils.get(config.endPoints.users).then((response) => {
      if (response.status === 400) {
        console.log(response.message);
      } else if (response.status === 200) {
        dispatch({ type: GET_PROJECT_USERS, payload: response.data });
      }
    });
  };
}

export function assignUser(projectId, userId) {
  return function action(dispatch) {
    return httpUtils
      .post(config.endPoints.assignUser, { projectId, userId })
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          dispatch({ type: ASSIGN_USER, payload: response.message });
        }
      });
  };
}

export function showProjects() {
  return function action(dispatch) {
    return httpUtils.get(config.endPoints.projects).then((response) => {
      if (response.status === 400) {
        console.log(response.message);
      } else if (response.status === 200) {
        dispatch({ type: SHOW_PROJECTS, payload: response.data });
      }
    });
  };
}

export function showProjectDetails(projectId) {
  return function action(dispatch) {
    return httpUtils
      .get(config.endPoints.projectDetails + `/${projectId}`)
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          dispatch({ type: SHOW_PROJECT_DETAILS, payload: response.data });
        }
      });
  };
}

export function showProjectTasks(projectId) {
  return function action(dispatch) {
    return httpUtils
      .post(config.endPoints.tasks, { project_id: projectId })
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          dispatch({ type: SHOW_PROJECT_TASKS, payload: response.data });
        }
      });
  };
}

export function addProject(body) {
  return function action(dispatch) {
    return httpUtils
      .post(config.endPoints.addProject, body)
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          dispatch({ type: ADD_PROJECT });
        }
      });
  };
}

export function deleteProject(body) {
  return function action(dispatch) {
    return httpUtils
      .deleteEntry(config.endPoints.removeProject, body)
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          dispatch({ type: DELETE_PROJECT });
          dispatch(showProjects());
        }
      });
  };
}

export function removeTask(body) {
  return function action(dispatch) {
    return httpUtils
      .deleteEntry(config.endPoints.removeTask, body)
      .then((response) => {
        if (response.status === 400) {
          console.log(response.message);
        } else if (response.status === 200) {
          dispatch({ type: REMOVE_TASK });
          dispatch({ type: EMPTY_TASK });
          window.location.reload();
        }
      });
  };
}
