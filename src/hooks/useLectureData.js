import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DateFns from "date-fns";
import { useDispatch } from "react-redux";
import { setEventsOwner } from "src/actions/events";
import { GetUserId } from "src/selectors";
import lectureService from "src/services/lecture.service";

export function useLecturesData(eventId, ...optimize) {
  let fetchSpeakersData = lectureService.getLecturesByEventID(eventId);
  const [lecturesData, setLecturesData] = useState(null);

  useEffect(() => {
    if (eventId >= 0) {
      fetchSpeakersData.then((response) => {
        let data = response.data;
        data = data.map((lecture) => {
          lecture.startDate = DateFns.parseISO(lecture.startDate);
          return lecture;
        });
        setLecturesData(data);
      });
    }
  }, optimize ?? []);

  return lecturesData;
}

export function useLectureData(lectureId, ...optimize) {
  let fetchSpeakersData = lectureService.getLectureByLectureID(lectureId);
  const [lectureData, setLectureData] = useState(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (lectureId >= 0) {
      fetchSpeakersData.then((response) => {
        let data = response.data;
        data = data.map((lecture) => {
          lecture.startDate = DateFns.parseISO(lecture.startDate);
          return lecture;
        });
        setLectureData(data);
      });
    }
  }, optimize ?? []);

  return lectureData;
}
