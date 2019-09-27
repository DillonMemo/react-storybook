import { storiesOf } from "@storybook/react";
import React from "react";

import ReadFileTable from "../src/components/YapTV/ReadFileTable";

storiesOf("Yap TV", module).add(
  "ReadFileTable",
  () => <ReadFileTable>Material Table</ReadFileTable>,
  { notes: "Material UI Table component를 활용한 Table component 입니다." }
);
