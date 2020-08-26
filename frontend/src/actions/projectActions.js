import * as httpUtils from "../utils/http";
import * as config from "../configs/appconfig";

export const SHOW_PROJECTS = "SHOW_PROJECTS";
export const SHOW_PROJECT_DETAILS = "SHOW_PROJECT_DETAILS";
export const SHOW_PROJECT_TASKS = "SHOW_PROJECT_TASKS";
export const ADD_PROJECT = "ADD_PROJECT";

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
