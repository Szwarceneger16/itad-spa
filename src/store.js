import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import devToolsEnhancer from "remote-redux-devtools";
import actionCreators from "src/actions/";

const middleware = [thunk];

const composer = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

// if (process.env.NODE_ENV === "development")
const store = createStore(
  rootReducer,
  composer(applyMiddleware(...middleware))
);

export default store;
