import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth";
import { webSocketReducer } from "./webSocket";
import { modalReducer } from "./modal"

const rootReducer = combineReducers({
  auth: authReducer,
  webSocket: webSocketReducer,
  modal: modalReducer,
})

export const store = createStore(rootReducer)