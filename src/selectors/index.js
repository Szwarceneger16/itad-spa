import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// const GetUserRoles = state => {
//     return ["user"].concat((state.auth.user && state.auth.user.role ?? [] ));
// };

const GetLogginStatus = () => {
  return useSelector((state) => state.auth.isLoggedIn);
};

const GetUserId = () => {
  return useSelector((state) => state.auth.user.id);
};

const GetUserRoles = () => {
  const isLogged = GetLogginStatus();
  let userRoles = useSelector(
    (state) => (state.auth.user && state.auth.user.role) ?? []
  );
  return isLogged ? ["user"].concat(userRoles) : [];
};

export { GetUserRoles, GetUserId, GetLogginStatus };
