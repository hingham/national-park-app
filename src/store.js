import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import parkReducer from "./reducers.js";

let reducers = combineReducers({
  records: parkReducer
});

const store = () =>
  createStore(reducers, composeWithDevTools(applyMiddleware()));

export default store;