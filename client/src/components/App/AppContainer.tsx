import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SidebarMaster from "../masters/SidebarMaster";
import BodyMaster from "../masters/BodyMaster";

// Routes
import Home from "../../Routes/Home";
import D3 from "../../Routes/D3";
import Tables from "../../Routes/Interfaces/Tables";

const App: React.FC = ({ component }: any) => {
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
    <React.Fragment>
      <Router>
        <div className={getToggleSummaryClass()}>
          <SidebarMaster />
          <BodyMaster onChangeIsSummary={onChangeIsSummary}>
            <Routes />
          </BodyMaster>
        </div>
      </Router>
    </React.Fragment>
  );
};

const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path={"/d3"} component={D3} />
    <Route path={"/interfaces/tables"} component={Tables} />
  </Switch>
);

export default App;
