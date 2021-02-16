import { createTypes } from "reduxsauce";

export const Type = createTypes(`
  UPDATE_HOST
  UPDATE_USER
  UPDATE_PASSWORD
  CLEAR_MESSAGES
  SHOW_ROW_DETAILS
  AUTH_USER
  AUTH_USER_SUCCESS
  AUTH_USER_FAILURE
`);

const updateHost = (payload: string) => ({ type: Type.UPDATE_HOST, payload });
const updateUser = (payload: string) => ({ type: Type.UPDATE_USER, payload });
const updatePassword = (payload: string) => ({
  type: Type.UPDATE_PASSWORD,
  payload,
});
const clearMessages = () => ({ type: Type.CLEAR_MESSAGES });
const showRowDetails = (payload: any) => ({
  type: Type.SHOW_ROW_DETAILS,
  payload,
});
const authUser = (payload: { user: string; password: string }) => ({
  type: Type.AUTH_USER,
  payload,
});
const authUserSuccess = (payload: string) => ({
  type: Type.AUTH_USER_SUCCESS,
  payload,
});
const authUserFailure = () => ({ type: Type.AUTH_USER_FAILURE });

export const Action = {
  updateHost,
  updateUser,
  updatePassword,
  clearMessages,
  showRowDetails,
  authUser,
  authUserSuccess,
  authUserFailure,
};
