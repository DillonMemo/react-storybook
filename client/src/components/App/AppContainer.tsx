import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "../../modules";
import SidebarMaster from "../masters/SidebarMaster";
import BodyMaster from "../masters/BodyMaster";

// Routes
import Home from "../../routes/Home";
import D3 from "../../routes/D3";
import Test from "../../routes/Interfaces/_test";

const store = createStore(rootReducer);

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
  </Switch>
);

export default App;
