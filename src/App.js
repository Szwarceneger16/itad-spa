import worker from './workerStart.js';
//import {sessionManager} from './components/sessionStore/sessionManager.js.bak'
import React, { Component, Suspense,  useCallback, useContext, useState } from "react";
import {
  BrowserRouter  as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import { useMediaQuery } from '@chakra-ui/react';
import TopNav from './components/navbar/TopNavBar.js';
import AppSwitch from './components/appSwitch/appSwitch';
import './App.css';
import route from "./components/routes/route.js";
import i18next from './components/i18nextConfig.js';
import { userTokenContext } from './components/contexts.js';
import MenuDotNetCircle from './components/spinBar';
import Footer from './components/footer';
import { connect } from "react-redux";

const definedRoutes = route.filter( el => {
  if ( el.component === undefined) return false;
  return true;
}) 

function App() { 
    //const [ mrr, setMrr ] = useState('initial');
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    //const store = useStore(pageProps.initialReduxState);
    //console.log('rerender = ' + mrr);

  return (
    // <div>
      <Router basename="">
        <Suspense fallback={<h1>Page is loading</h1>}>
            <TopNav route={definedRoutes} /* store={sessionManager} */ />
            {isLargerThan768 && <MenuDotNetCircle right="-25px" />}

          
            {/* <userTokenContext.Provider value={setMrr}> */}
            <Suspense fallback={<h1>Profile loading</h1>}>
              <AppSwitch route={route} />     
            </Suspense>
            {/* </userTokenContext.Provider> */}

            <Footer></Footer>
        </Suspense>
      </Router>
    // </div>
  )

};

// function mapStateToProps(state) {
//   const { user } = state.auth;
//   return {
//     user,
//   };
// }
// export default connect(mapStateToProps)(App);
export default App;

