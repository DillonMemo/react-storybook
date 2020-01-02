import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { createLogger } from "redux-logger";

import rootReducer from "../../modules";
import SidebarMaster from "../masters/SidebarMaster";
import BodyMaster from "../masters/BodyMaster";

// Routes
import Home from "../../routes/Home";
import D3 from "../../routes/D3";
import Test from "../../routes/Interfaces/_test";
import NProgress from "../../routes/Interfaces/nprogress";
import Skeleton from "../../routes/Interfaces/skeleton";
import Loader from "../../routes/Loader";
import SnackBar from "../../routes/Interfaces/snackbar";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    promiseMiddleware, // resolves promises
    createLogger() // log actions in console
  )
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer
  // promise middleware
);

const App: React.FC = () => {
  const [isSummary, setIsSummary] = useState<boolean>(true);

  const onChangeIsSummary = () => {
    setIsSummary(!isSummary);
  };

  const getToggleSummaryClass = () => {
    let elementClasses = ["template"];

    if (isSummary === true) {
      elementClasses.push("with-summary");
    }

    return elementClasses.join(" ");
  };
  return (
    <Provider store={store}>
      <Router>
        <div className={getToggleSummaryClass()}>
          <SidebarMaster />
          <BodyMaster onChangeIsSummary={onChangeIsSummary}>
            <Routes />
          </BodyMaster>
        </div>
      </Router>
    </Provider>
  );
};

const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path={"/d3"} component={D3} />
    <Route path={"/interfaces/_test"} component={Test} />
    <Route path={"/interfaces/nprogress"} component={NProgress} />
    <Route path={"/interfaces/skeleton"} component={Skeleton} />
    <Route path={"/interfaces/snackbar"} component={SnackBar} />
    <Route path={"/loader"} component={Loader} />
  </Switch>
);

export default App;
