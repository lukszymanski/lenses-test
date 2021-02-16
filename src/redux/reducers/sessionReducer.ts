import { createReducer } from "reduxsauce";
import { Type, Action } from "../actions";

export const SESSION_STATE_KEY = "session";

export interface SessionState {
  heartbeatCount: number;
  messages: any[];
  host: string;
  user: string;
  password: string;
  message: any;
  token: string | null;
}

export interface SessionPartialState {
  [SESSION_STATE_KEY]: SessionState;
}

export const INITIAL_STATE: SessionState = {
  heartbeatCount: 0,
  messages: [],
  host: "",
  user: "",
  password: "",
  message: {},
  token: null,
};

const onUpdateHost = (
  state: SessionState,
  action: ReturnType<typeof Action.updateHost>
) => ({ ...state, host: action.payload });
const onUpdateUser = (
  state: SessionState,
  action: ReturnType<typeof Action.updateUser>
) => ({ ...state, user: action.payload });
const onUpdatePassword = (
  state: SessionState,
  action: ReturnType<typeof Action.updatePassword>
) => ({ ...state, password: action.payload });
const onClearMessages = (
  state: SessionState,
  action: ReturnType<typeof Action.clearMessages>
) => ({ ...state, messages: [] as any });
const onShowRowDetails = (
  state: SessionState,
  action: ReturnType<typeof Action.showRowDetails>
) => ({ ...state, message: action.payload });
const onAuthUserSuccess = (
  state: SessionState,
  action: ReturnType<typeof Action.authUserSuccess>
) => ({
  ...state,
  token: action.payload,
});

// const onKafkaHeartbeat = state => Object.assign({}, state,
//   { heartbeatCount: state.heartbeatCount + 1 });
// const onKafkaMessage = (state: SessionState, action: ReturnType<typeof Action.updateHost>) => {
//   let messages = (action.payload && action.payload.content) || [];
//   return Object.assign({}, state, {
//     messages: state.messages.concat(messages),
//   });
// };

// map our types to our handlers
const ACTION_HANDLERS = {
  [Type.UPDATE_HOST]: onUpdateHost,
  [Type.UPDATE_USER]: onUpdateUser,
  [Type.UPDATE_PASSWORD]: onUpdatePassword,
  [Type.CLEAR_MESSAGES]: onClearMessages,
  [Type.SHOW_ROW_DETAILS]: onShowRowDetails,
  [Type.AUTH_USER_SUCCESS]: onAuthUserSuccess,
};

export const sessionSelector = (state: SessionPartialState) =>
  state[SESSION_STATE_KEY];

export const sessionHeartbeatCountSelector = (state: SessionPartialState) =>
  state[SESSION_STATE_KEY].heartbeatCount;

export const sessionReducer = createReducer(INITIAL_STATE, ACTION_HANDLERS);
