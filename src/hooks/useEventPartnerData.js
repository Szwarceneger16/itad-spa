import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearEventPartnerData, setEventPartnerData } from "src/actions/events";
import eventPartnerService from "src/services/eventPartner.service";
import { SET_EVENTPARTNER_DATA } from "src/actions/types";
import { GetLastUpdatedDataType } from "src/selectors";

export function useEventPartnerData(eventId) {
  const [_eventPartnerData, set_EventPartnerData] = useState(null);
  const [isEventPartnerUpdateOccurs, setEventPartnerUpdateOccurs] = useState(
    null
  );
  const dispatch = useDispatch();
  const lastUpdatedType = GetLastUpdatedDataType();

  if (
    lastUpdatedType.last === SET_EVENTPARTNER_DATA &&
    lastUpdatedType.isChange !== isEventPartnerUpdateOccurs?.isChange
  ) {
    setEventPartnerUpdateOccurs(lastUpdatedType);
  }

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
  }, [isEventPartnerUpdateOccurs]);

  return _eventPartnerData;
}
