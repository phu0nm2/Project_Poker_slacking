import { createStore, combineReducers } from "redux";
import player from "./reducers/player";
import card from "./reducers/card";
import status from "./reducers/status";
//create root reducer
const reducer = combineReducers({
  player,
  card,
  status,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
