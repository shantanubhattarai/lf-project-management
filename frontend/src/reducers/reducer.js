import { combineReducers } from "redux";

import adminReducer from "./adminReducer";

const reducer = combineReducers({
  admin: adminReducer,
});

export default reducer;
