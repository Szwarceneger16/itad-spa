import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DateFns from "date-fns";
import { useDispatch } from "react-redux";
import {
  clearLectureData,
  setEventsOwner,
  setLectureData,
} from "src/actions/events";
import { GetLastUpdatedDataType, GetUserId } from "src/selectors";
import lectureService from "src/services/lecture.service";
import { SET_LECTURE_DATA } from "src/actions/types";

export function useLecturesData(eventId) {
  const [lecturesData, setLecturesData] = useState(null);
  const [isLecturesUpdateOccurs, setLecturesUpdateOccurs] = useState(null);
  const dispatch = useDispatch();
  const lastUpdatedType = GetLastUpdatedDataType();

  if (
    lastUpdatedType.last === SET_LECTURE_DATA &&
    lastUpdatedType.isChange !== isLecturesUpdateOccurs?.isChange
  ) {
    setLecturesUpdateOccurs(lastUpdatedType);
  }

  useEffect(() => {
    if (eventId >= 0) {
      lectureService
        .getLecturesByEventID(eventId)
        .then((response) => {
          let data = response.data;
          data = data.map((lecture) => {
            lecture.startDate = DateFns.parseISO(lecture.startDate);
            return lecture;
          });
          setLecturesData(data);
          dispatch(setLectureData(data));
        })
        .catch((error) => {});
    }
    return () => {
      dispatch(clearLectureData());
    };
  }, [isLecturesUpdateOccurs]);

  return lecturesData;
}
