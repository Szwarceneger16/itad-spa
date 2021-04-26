import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";

const combined = combineReducers({
  auth,
  message,
});

export default combined;
