import { combineReducers } from "redux";

import projectReducer from "./projectReducer";
import authReducer from "./authReducer";
import taskReducer from "./taskReducer";

const reducer = combineReducers({
  project: projectReducer,
  auth: authReducer,
  task: taskReducer,
});

export default reducer;
