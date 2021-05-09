import {
  SET_EVENTS_OWNER,
  CLEAR_EVENTS,
  CLEAR_EVENTS_OWNER,
  SET_EVENTS,
} from "../actions/types";

export const setEvents = (events) => ({
  type: SET_EVENTS,
  payload: { events },
});

export const clearEvents = () => ({
  type: CLEAR_EVENTS,
});

export const setEventsOwner = (owner) => ({
  type: SET_EVENTS_OWNER,
  payload: { owner },
});

export const clearEventsOwner = () => ({
  type: CLEAR_EVENTS_OWNER,
});
