import * as Pages from "../../pages";

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
    name: "myEvents",
    path: "/myEvents",
    secure: ["user", "admin"],
    navbarDisplay: false,
    component: Pages.MyEvents,
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
  {
    name: "events",
    path: "/events",
    secure: ["user", "admin"],
    navbarDisplay: true,
    component: Pages.Events,
  },
  {
    name: "list",
    path: "/eventDetails/:eventId",
    secure: ["user", "admin"],
    component: Pages.EventDetails,
  },
  {
    name: "event",
    path: "/eventModify/:id?",
    secure: ["user", "admin"],
    navbarDisplay: false,
    component: Pages.EventAddEdit,
  },
];
