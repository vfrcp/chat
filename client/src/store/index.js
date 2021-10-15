import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth";
import { webSocketReducer } from "./webSocket";
import { modalReducer } from "./modal"
import { RenderListReducer } from "./RenderList";

const rootReducer = combineReducers({
  auth: authReducer,
  webSocket: webSocketReducer,
  modal: modalReducer,
  renderList: RenderListReducer,
})

export const store = createStore(rootReducer)