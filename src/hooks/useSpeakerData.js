import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DateFns from "date-fns";
import { useDispatch } from "react-redux";
import {
  clearSpeakersData,
  setEventsOwner,
  setSpeakersData,
} from "src/actions/events";
import { GetUserId } from "src/selectors";
import speakerService from "src/services/speaker.service";

export function useSpeakersData(eventId, optimize) {
  const [_speakersData, set_SpeakersData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventId >= 0) {
      speakerService
        .getSpeakersByEventID(eventId)
        .then((response) => {
          let data = response.data;
          set_SpeakersData(data);
          dispatch(setSpeakersData(data));
        })
        .catch((error) => {});
    }
    return () => {
      dispatch(clearSpeakersData());
    };
  }, optimize ?? []);

  return _speakersData;
}
