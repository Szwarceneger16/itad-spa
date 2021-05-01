import worker from "./workerStart.js";
import createAxiosResponseInterceptor from "./services/axiosInstance";
import React, {
  Component,
  Suspense,
  useCallback,
  useContext,
  useState,
} from "react";

import { useMediaQuery } from "@chakra-ui/react";
import TopNav from "./components/navbar/TopNavBar.js";
import AppSwitch from "./components/router/appSwitch";
import "./App.css";
import routesConf from "./components/routes/route.js";
import i18next from "./components/i18nextConfig.js";
import { userTokenContext } from "./components/contexts.js";
import MenuDotNetCircle from "./components/spinBar";
import Footer from "./components/footer";
import { connect } from "react-redux";
import spinBarRoutes from "./components/routes/spinBarRoutes";
import Toast from "./components/toast";
import { GetUserRoles, GetLogginStatus } from "./selectors";

const routes = routesConf.filter((el) => {
  if (el.component === undefined) return false;
  return true;
});

createAxiosResponseInterceptor();

function App() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const crownRoutes = spinBarRoutes();
  const userRoles = GetUserRoles();
  const isLoggedIn = GetLogginStatus();

  const filteredRoutes = routes.filter((el) => {
    //debugger;
    if (isLoggedIn && ["login", "register"].includes(el.name)) {
      return false;
    }

    if (el.secure && !el.secure.some((el) => userRoles.includes(el))) {
      return false;
    }

    return true;
  });

  return (
    <Suspense fallback={<h1>Page is loading</h1>}>
      <TopNav route={filteredRoutes} isLoggedIn={isLoggedIn} />
      {isLargerThan768 && (
        <MenuDotNetCircle right="-25px" onClicksFunctions={crownRoutes} />
      )}

      <Suspense fallback={<h1>Profile loading</h1>}>
        <AppSwitch route={filteredRoutes} />
      </Suspense>

      <Footer></Footer>
      <Toast />
    </Suspense>
  );
}

export default App;
