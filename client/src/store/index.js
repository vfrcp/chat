import { createStore, combineReducers } from "redux";
import { authReducer } from "./authReduser";
import { webSocketReducer } from "./webSocketReduser";

const rootReducer = combineReducers({
  auth: authReducer,
  webSocket: webSocketReducer,
})

export const store = createStore(rootReducer)