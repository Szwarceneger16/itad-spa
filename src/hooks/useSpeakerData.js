import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearSpeakersData, setSpeakersData } from "src/actions/events";
import { GetLastUpdatedDataType, GetUserId } from "src/selectors";
import speakerService from "src/services/speaker.service";
import { SET_SPEAKER_DATA } from "src/actions/types";

export function useSpeakersData(eventId) {
  const [_speakersData, set_SpeakersData] = useState(null);
  const [isSpeakersUpdateOccurs, setSpeakersUpdateOccurs] = useState(null);
  const dispatch = useDispatch();
  const lastUpdatedType = GetLastUpdatedDataType();

  if (
    lastUpdatedType.last === SET_SPEAKER_DATA &&
    lastUpdatedType.isChange !== isSpeakersUpdateOccurs?.isChange
  ) {
    setSpeakersUpdateOccurs(lastUpdatedType);
  }

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
  }, [isSpeakersUpdateOccurs]);

  return _speakersData;
}
