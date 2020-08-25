import { combineReducers } from "redux";

import projectReducer from "./projectReducer";
import authReducer from "./authReducer";

const reducer = combineReducers({
  project: projectReducer,
  auth: authReducer,
});

export default reducer;
