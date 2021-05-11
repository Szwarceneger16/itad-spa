import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setMessage = (message, status) => ({
  type: SET_MESSAGE,
  payload: { message, status },
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
