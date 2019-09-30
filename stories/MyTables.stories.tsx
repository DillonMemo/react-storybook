import { storiesOf } from "@storybook/react";
import React from "react";

import { data, columns } from "../src/components/MyUI/Tables/utils/default-data";
import CustomMaterialTable from "../src/components/MyUI/Tables/CustomMaterialTable";
import TestTable from "../src/components/_test/Tables/TestTable";

storiesOf("MY Tables", module)
  .add(
    "Custom Material Table",
    () => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CustomMaterialTable columns={columns} data={data} />
      </div>
    ),
    { notes: "Material Table Lib를 분석하여 커스텀 클론 코딩." }
  )
  .add("Custom Test Table", () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TestTable columns={columns} data={data} stickyHeader />
    </div>
  ));
