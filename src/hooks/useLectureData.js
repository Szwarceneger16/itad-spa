import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DateFns from "date-fns";
import { useDispatch } from "react-redux";
import {
  clearLectureData,
  setEventsOwner,
  setLectureData,
} from "src/actions/events";
import { GetUserId } from "src/selectors";
import lectureService from "src/services/lecture.service";

export function useLecturesData(eventId, optimize) {
  const [lecturesData, setLecturesData] = useState(null);
  const dispatch = useDispatch();

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
  }, optimize ?? []);

  return lecturesData;
}
