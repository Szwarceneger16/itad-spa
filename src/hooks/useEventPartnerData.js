import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DateFns from "date-fns";
import { useDispatch } from "react-redux";
import { clearEventPartnerData, setEventPartnerData } from "src/actions/events";
import eventPartnerService from "src/services/eventPartner.service";

export function useEventPartnerData(eventId, optimize) {
  const [_eventPartnerData, set_EventPartnerData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventId >= 0) {
      eventPartnerService
        .getEventPartnersByEventID(eventId)
        .then((response) => {
          let data = response.data;
          set_EventPartnerData(data);
          dispatch(setEventPartnerData(data));
        })
        .catch((error) => {});
    }
    return () => {
      dispatch(clearEventPartnerData());
    };
  }, optimize ?? []);

  return _eventPartnerData;
}
