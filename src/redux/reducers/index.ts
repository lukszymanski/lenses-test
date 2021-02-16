import { combineReducers } from "redux";
import {
  sessionReducer,
  SessionState,
  SESSION_STATE_KEY,
} from "./sessionReducer";

export interface AppState {
  [SESSION_STATE_KEY]: SessionState;
}

const rootReducer = combineReducers({
  [SESSION_STATE_KEY]: sessionReducer,
});

export default rootReducer;
export * from "./sessionReducer";
