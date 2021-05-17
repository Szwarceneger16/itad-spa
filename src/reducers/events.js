import {
  SET_EVENTS_OWNER,
  CLEAR_EVENTS_OWNER,
  CLEAR_LECTURE_DATA,
  SET_LECTURE_DATA,
  SET_SPEAKER_DATA,
  CLEAR_SPEAKER_DATA,
  SET_EVENTPARTNER_DATA,
  CLEAR_EVENTPARTNER_DATA,
  SET_LASTUPDATED_DATA,
  CLEAR_LASTUPDATED_DATA,
} from "../actions/types";

const initialState = { lastUpdatedType: { prev: "", last: "" } };

export default function (state = initialState, action) {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case SET_EVENTS_OWNER:
      newState = {
        ...state,
        owner: payload.owner,
      };
      return newState;

    case CLEAR_EVENTS_OWNER:
      newState = { ...state, owner: null };
      return newState;

    case SET_LECTURE_DATA:
      newState = {
        ...state,
        lecturesData: payload.lecturesData,
      };
      return newState;

    case CLEAR_LECTURE_DATA:
      newState = { ...state, lecturesData: null };
      return newState;

    case SET_SPEAKER_DATA:
      newState = {
        ...state,
        speakersData: payload.speakersData,
      };
      return newState;

    case CLEAR_SPEAKER_DATA:
      newState = { ...state, speakersData: null };
      return newState;

    case SET_EVENTPARTNER_DATA:
      newState = {
        ...state,
        eventPartnerData: payload.eventPartnerData,
      };
      return newState;

    case CLEAR_EVENTPARTNER_DATA:
      newState = { ...state, eventPartnerData: null };
      return newState;

    case SET_LASTUPDATED_DATA:
      newState = {
        ...state,
        lastUpdatedType: {
          prev: state.lastUpdatedType.last,
          last: payload.type,
        },
      };
      return newState;

    case CLEAR_LASTUPDATED_DATA:
      newState = { ...state, lastUpdatedType: null };
      return newState;

    default:
      return state;
  }
}
