import { useEffect, useState } from "react";
import userService from "src/services/user.service";

export function useTicketsData(optimize) {
  const [userTickets, setUserTickets] = useState(null);

  useEffect(() => {
    userService
      .getAllUserTickets()
      .then((response) => {
        let data = response.data;
        setUserTickets(data);
      })
      .catch((error) => {});
  }, optimize ?? []);

  return userTickets;
}
