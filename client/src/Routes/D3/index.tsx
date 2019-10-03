import React from "react";

import Donut from "./Donut";
import Pie from "./Pie";
import Bar from "./Bar";
import Line from "./Line";

const D3: React.FunctionComponent = () => {
  return (
    <div>
      <h2>D3 Chart Example</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center"
        }}>
        <Donut />
        <Pie />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          marginTop: 30
        }}>
        <Bar />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          marginTop: 30
        }}>
        <Line />
      </div>
    </div>
  );
};

export default D3;
