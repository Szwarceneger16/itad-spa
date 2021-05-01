import {
  EVENTS_CLEAR,
  EVENTS_SET,
  EVENT_MODIFY,
  EVENT_REMOVE,
  EVENT_APPEND,
} from "../actions/types";

let events = JSON.parse(localStorage.getItem("events"));

const initialState = events ? { events } : { events: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case EVENTS_CLEAR:
      localStorage.clear("events");
      return { ...state, events: [] };
    case EVENTS_SET:
      localStorage.setItem("events", JSON.stringify(payload.events));
      return { ...state, events: payload.events };
    case EVENT_MODIFY: {
      const copy = [...state.events];
      const indexToEdit = copy.findIndex((el) => payload.event.id === el.id);
      copy[indexToEdit] = payload.event;
      return { ...state, events: copy };
    }
    case EVENT_REMOVE: {
      const copy = [...state.events];
      const indexToEdit = copy.findIndex((el) => payload.id === el.id);
      copy.splice(indexToEdit, 1);
      return { ...state, events: copy };
    }
    case EVENT_APPEND:
      return { ...state, events: [...state.events, payload.event] };
    default:
      return state;
  }
}
