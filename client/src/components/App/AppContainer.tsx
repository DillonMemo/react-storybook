import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "../../modules";
import SidebarMaster from "../masters/SidebarMaster";
import BodyMaster from "../masters/BodyMaster";

// Routes
import Home from "../../routes/Home";
import D3 from "../../routes/D3";
import Test from "../../routes/Interfaces/_test";
import NProgress from "../../routes/Interfaces/nprogress";
import Skeleton from "../../routes/Interfaces/skeleton";
import LoadingBar from "react-redux-loading-bar";

const store = createStore(
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
      <header>
        <LoadingBar style={{ backgroundColor: "blue", height: 3 }} />
      </header>
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
  </Switch>
);

export default App;
