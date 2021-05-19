import { useEffect, useState } from "react";

import eventService from "src/services/event.service";

export function useAttendanceData(eventId) {
  const [registeredUsers, setRegisteredUsers] = useState(null);

  useEffect(() => {
    if (eventId >= 0) {
      eventService
        .getRegisteredUsers(eventId)
        .then((response) => {
          let data = response.data;
          setRegisteredUsers(data);
        })
        .catch((error) => {});
    }
  }, []);

  return registeredUsers;
}
