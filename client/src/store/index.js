import { createStore } from "redux";
import { authReducer } from "./authReduser";

export const store = createStore(authReducer)