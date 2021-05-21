import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function (params) {
  let history = useHistory();
  //   const { t, i18n } = useTranslation(["common"]);

  return [
    {
      name: "events",
      callback: () => {
        history.push("/events");
      },
    },
    {
      name: "MyTickets",
      callback: () => {
        history.push("/myTickets");
      },
    },
    {
      name: "ScanQR",
      callback: () => {
        history.push("/scannQR");
      },
    },
    {
      name: "MyQR",
      callback: () => {
        history.push("/myQR");
      },
    },
  ];
}
