// import React, { useCallback, useState } from "react";
// import map from './img/map.jpg';
// import './App.css';
// import { render } from 'react-dom';
// // import InteractiveMap from './myDependency/interactiveMap/index.js';

// export default function App() {


//   return (
//     <div className="App">
//       <header className="App-header" >

//       </header>
//     </div>
//   )
// };


import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
const routes = [
  {
    path: "/sandwiches",
    component: Sandwiches
  },
  {
    path: "/tacos",
    component: Tacos,
    routes: [
      {
        path: "/tacos/tacos",
        component: Tacos,
        routes: [
          {
            path: "/tacos/tacos/bus",
            component: Bus
          },
          {
            path: "/tacos/tacos/cart",
            component: Cart
          }
        ]
      },
      {
        path: "/tacos/cart",
        component: Cart
      }
    ]
  },
  {
    path: "/",
    component: Default
  },
];

export default function RouteConfigExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/tacos">Tacos</Link>
          </li>
          <li>
            <Link to="/sandwiches">Sandwiches</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  debugger;
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function Default() {
  return <h2>Default</h2>;
}

function Sandwiches() {
  return <h2>Sandwiches</h2>;
}

function Tacos({ routes }) {
  let { url } = useRouteMatch();
  //debugger;
  console.log(url);

  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to={`${url}/tacos`}>Busssss</Link>
        </li>
        <li>
          <Link to={`${url}/cart`}>Cart</Link>
        </li>
      </ul>

      <Switch>
        {
        routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}

function Bus() {
  return <h3>Bus</h3>;
}

function Cart() {
  return <h3>Cart</h3>;
}
