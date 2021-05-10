import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DateFns from "date-fns";
import { useDispatch } from "react-redux";
import { setEventsOwner } from "src/actions/events";
import { GetUserId } from "src/selectors";
import speakerService from "src/services/speaker.service";

export function useSpeakersData(eventId, ...optimize) {
  let fetchSpeakersData = speakerService.getSpeakersByEventID(eventId);
  const [speakersData, setSpeakersData] = useState(null);

  useEffect(() => {
    if (eventId >= 0) {
      fetchSpeakersData.then((response) => {
        let data = response.data;
        setSpeakersData(data);
      });
    }
  }, optimize ?? []);

  return speakersData;
}

export function useSpeakerData(speakerId, ...optimize) {
  let fetchSpeakersData = speakerService.getSpeakerBySpeakerID(speakerId);
  const [speakerData, setSpeakerData] = useState(null);

  useEffect(() => {
    if (speakerId >= 0) {
      fetchSpeakersData.then((response) => {
        let data = response.data;
        setSpeakerData(data);
      });
    }
  }, optimize ?? []);

  return speakerData;
}
