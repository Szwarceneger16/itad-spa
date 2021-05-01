import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import events from "./events";

const combined = combineReducers({
  auth,
  message,
  events,
});

export default combined;
