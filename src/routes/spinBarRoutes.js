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
      name: "myTickets",
      callback: () => {
        history.push("/myTickets");
      },
    },
    {
      name: "scanQR",
      callback: () => {
        history.push("/scannQR");
      },
    },
    {
      name: "myQR",
      callback: () => {
        history.push("/myQR");
      },
    },
  ];
}
