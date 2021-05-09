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
  const userId = useSelector((state) => state.auth.user.userId);
  return userId;
};

export const GetEvents = () => {
  return useSelector((state) => state.events.events);
};

export const GetUserRoles = () => {
  const isLogged = GetLogginStatus();
  let userRoles = useSelector(
    (state) => (state.auth.user && state.auth.user.role) ?? []
  );
  return isLogged ? ["user"].concat(userRoles) : [];
};
