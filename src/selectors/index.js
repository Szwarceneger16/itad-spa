// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// const GetUserRoles = state => {
//     return ["user"].concat((state.auth.user && state.auth.user.role ?? [] ));
// };

export const GetLogginStatus = () => {
  return useSelector((state) => state.auth.isLoggedIn);
};

export const GetUserId = () => {
  const userId = useSelector((state) => state.auth?.user.userId);
  return userId;
};

export const GetEvents = () => {
  return useSelector((state) => state.events.events);
};

export const GetUserUUID = () => {
  return useSelector((state) => state.auth.user.uuid);
};

export const GetLectureData = () =>
  useSelector((state) => state.events.lecturesData);

export const GetSpeakersData = () =>
  useSelector((state) => state.events.speakersData);

export const GetEventPartnerData = () =>
  useSelector((state) => state.events.eventPartnerData);

export const GetLastUpdatedDataType = () =>
  useSelector((state) => state.events.lastUpdatedType);

export const GetUserRoles = () => {
  const isLogged = GetLogginStatus();
  let userRoles = useSelector(
    (state) => (state.auth.user && state.auth.user.role) ?? []
  );
  return isLogged ? ["user"].concat(userRoles) : [];
};
