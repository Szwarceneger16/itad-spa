import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { pl, enUS,enGB } from 'date-fns/locale'
import { Provider } from "react-redux";
import store from "./store.js";

// const theme = extendTheme({
//   fonts: {
//     body: "Tangerine, serif",
//     heading: "Tangerine, serif",
//     mono: "Tangerine, serif",
//   },
// })
debugger;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider /* theme={theme} */>
        {/* <ColorModeScript /> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
          <App />
        </MuiPickersUtilsProvider>
        
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
