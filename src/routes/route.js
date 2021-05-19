import * as Pages from "../pages";

const Home = {
  name: "home",
  path: "/home",
  navbarDisplay: true,
  component: Pages.Home,
};
export { Home };

export default [
  Home,
  {
    name: "about",
    path: "/about",
    navbarDisplay: true,
    component: Pages.About,
  },
  {
    name: "ScanQR",
    path: "/scannQR",
    secure: ["user", "admin"],
    navbarDisplay: true,
    component: Pages.ScanQR,
  },
  {
    name: "MyQR",
    path: "/myQR",
    secure: ["user", "admin"],
    navbarDisplay: true,
    component: Pages.MyQR,
  },
  {
    name: "MyTickets",
    path: "/myTickets",
    secure: ["user", "admin"],
    navbarDisplay: true,
    component: Pages.MyTickets,
  },
  {
    name: "accountVerification",
    path: "/accountVerification/:token",
    component: Pages.AccountVerification,
  },
  {
    name: "events",
    path: "/eventsAll",
    // secure: ["user", "admin"],
    navbarDisplay: true,
    component: Pages.Events,
  },
  {
    name: "list",
    path: "/event/detail/:eventId/:attendance?",
    // secure: ["user", "admin"],
    component: Pages.EventDetails,
  },
  {
    name: "event",
    path: "/event/modify/:eventId?",
    secure: ["user", "admin"],
    navbarDisplay: false,
    component: Pages.EventAddEdit,
  },
  {
    name: "login",
    path: "/login",
    navbarDisplay: true,
    component: Pages.Login,
  },

  {
    name: "register",
    path: "/register",
    navbarDisplay: true,
    component: Pages.Register,
  },
];
