import * as httpUtils from "../utils/http";
import * as config from "../configs/appconfig";

export const SHOW_PROJECTS = "SHOW_PROJECTS";

export function showProjects() {
  return function action(dispatch) {
    return httpUtils
      .get(config.endPoints.projects)
      .then((response) => dispatch({ type: SHOW_PROJECTS, payload: response }));
  };
}
