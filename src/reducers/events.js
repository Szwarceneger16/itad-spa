import {
  SET_EVENTS_OWNER,
  CLEAR_EVENTS,
  CLEAR_EVENTS_OWNER,
  SET_EVENTS,
} from "../actions/types";

let events = JSON.parse(localStorage.getItem("events"));

const initialState = events ? { events } : { events: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case SET_EVENTS_OWNER:
      newState = { ...state, owner: payload.owner };
      localStorage.setItem("events", JSON.stringify(newState));
      return newState;
    case CLEAR_EVENTS_OWNER:
      newState = { ...state, owner: null };
      localStorage.setItem("events", JSON.stringify(newState));
      return newState;
    case SET_EVENTS:
      newState = { ...state, events: payload.events };
      localStorage.setItem("events", JSON.stringify(newState));
      return newState;
    case CLEAR_EVENTS:
      newState = { ...state, events: null };
      localStorage.setItem("events", JSON.stringify(newState));
      return newState;
    // case EVENTS_CLEAR:
    //   localStorage.clear("events");
    //   return { ...state, events: null, owner: null };
    // case EVENTS_SET:
    //   localStorage.setItem("events", JSON.stringify(newState));
    //   return { ...state, events: payload.events };
    // case EVENT_MODIFY: {
    //   const copy = [...state.events];
    //   const indexToEdit = copy.findIndex((el) => payload.event.id === el.id);
    //   copy[indexToEdit] = payload.event;
    //   return { ...state, events: copy };
    // }
    // case EVENT_REMOVE: {
    //   const copy = [...state.events];
    //   const indexToEdit = copy.findIndex((el) => payload.id === el.id);
    //   copy.splice(indexToEdit, 1);
    //   return { ...state, events: copy };
    // }
    // case EVENT_APPEND:
    //   return { ...state, events: [...state.events, payload.event] };
    default:
      return state;
  }
}
