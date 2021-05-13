import {
  SET_EVENTS_OWNER,
  CLEAR_EVENTS_OWNER,
  CLEAR_LECTURE_DATA,
  SET_LECTURE_DATA,
  SET_SPEAKER_DATA,
  CLEAR_SPEAKER_DATA,
} from "../actions/types";

export const setSpeakersData = (speakersData) => ({
  type: SET_SPEAKER_DATA,
  payload: { speakersData },
});

export const clearSpeakersData = () => ({
  type: CLEAR_SPEAKER_DATA,
});

export const setLectureData = (lecturesData) => ({
  type: SET_LECTURE_DATA,
  payload: { lecturesData },
});

export const clearLectureData = () => ({
  type: CLEAR_LECTURE_DATA,
});

export const setEventsOwner = (owner) => ({
  type: SET_EVENTS_OWNER,
  payload: { owner },
});

export const clearEventsOwner = () => ({
  type: CLEAR_EVENTS_OWNER,
});
