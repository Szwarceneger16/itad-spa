import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EventService from "src/services/event.service";
import * as DateFns from "date-fns";
import { useDispatch } from "react-redux";
import { setEventsOwner } from "src/actions/events";
import { GetUserId } from "src/selectors";

export function useEventData(params) {
  const fetchEventsData = EventService.getAllEvents();
  const [eventsData, setEventsData] = useState(null);
  const dispatch = useDispatch();
  const userId = GetUserId();

  useEffect(() => {
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
  }, [userId]);

  return eventsData;
}
