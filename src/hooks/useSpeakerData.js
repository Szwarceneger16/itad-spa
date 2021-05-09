import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DateFns from "date-fns";
import { useDispatch } from "react-redux";
import { setEventsOwner } from "src/actions/events";
import { GetUserId } from "src/selectors";
import speakerService from "src/services/speaker.service";

export function useSpeakersData(eventId) {
  let fetchSpeakersData = speakerService.getSpeakersByEventID(eventId);
  const [speakersData, setSpeakersData] = useState(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (eventId >= 0) {
      fetchSpeakersData.then((response) => {
        let data = response.data;
        // data = data.map((event) => {
        //   event.startDate = DateFns.parseISO(event.startDate);
        //   return event;
        // });
        setSpeakersData(data);
      });
    }
  }, []);

  return speakersData;
}

export function useSpeakerData(speakerId) {
  let fetchSpeakersData = speakerService.getSpeakerBySpeakerID(speakerId);
  const [speakerData, setSpeakerData] = useState(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (speakerId >= 0) {
      fetchSpeakersData.then((response) => {
        let data = response.data;
        // data = data.map((event) => {
        //   event.startDate = DateFns.parseISO(event.startDate);
        //   return event;
        // });
        setSpeakerData(data);
      });
    }
  }, []);

  return speakerData;
}
