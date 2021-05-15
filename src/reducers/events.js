import {
  SET_EVENTS_OWNER,
  APPEND_EVENTS_OWNER,
  CLEAR_EVENTS_OWNER,
  CLEAR_LECTURE_DATA,
  SET_LECTURE_DATA,
  SET_SPEAKER_DATA,
  CLEAR_SPEAKER_DATA,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case SET_EVENTS_OWNER:
      newState = { ...state, owner: payload.owner };
      return newState;
    // case APPEND_EVENTS_OWNER:
    //   newState = { ...state, owner: [...state.owner, payload.owner] };
    //   return newState;
    case CLEAR_EVENTS_OWNER:
      newState = { ...state, owner: null };
      return newState;
    case SET_LECTURE_DATA:
      newState = { ...state, lecturesData: payload.lecturesData };
      return newState;
    case CLEAR_LECTURE_DATA:
      newState = { ...state, lecturesData: null };
      return newState;
    case SET_SPEAKER_DATA:
      newState = { ...state, speakersData: payload.speakersData };
      return newState;
    case CLEAR_SPEAKER_DATA:
      newState = { ...state, speakersData: null };

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
