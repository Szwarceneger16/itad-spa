import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EventService from "src/services/event.service";
import * as DateFns from "date-fns";
import { useDispatch } from "react-redux";
import { setEventsOwner } from "src/actions/events";
import { GetUserId } from "src/selectors";

export function useEventData(eventId) {
  let fetchEventsData = null;
  if (eventId === -1) {
    fetchEventsData = EventService.getEventsAll();
  } else if (eventId >= 0) {
    fetchEventsData = EventService.getEventByID(eventId);
  }

  const [eventsData, setEventsData] = useState(null);
  const dispatch = useDispatch();
  const userId = GetUserId();

  useEffect(() => {
    if (fetchEventsData && eventId === -1) {
      fetchEventsData.then((response) => {
        const myEventsId = [];
        let data = response.data;
        data = data.map((event) => {
          event.startDate = DateFns.parseISO(event.startDate);
          if (event.owner.id === userId) {
            myEventsId.push(event.eventId);
          }
          return event;
        });
        dispatch(setEventsOwner(myEventsId));
        setEventsData(data);
      });
    } else if (fetchEventsData && eventId >= 0) {
      fetchEventsData.then((response) => {
        const myEventsId = [];
        let event = response.data;
        event.startDate = DateFns.parseISO(event.startDate);
        setEventsData(event);
      });
    }
  }, [userId]);

  return eventsData;
}
