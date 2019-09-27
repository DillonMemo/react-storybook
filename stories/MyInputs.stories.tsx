import { storiesOf } from "@storybook/react";
import React from "react";

import FileInput from "../src/components/MyUI/Inputs/FileInput";

storiesOf("MY Inputs", module).add(
  "file input",
  () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FileInput
        Accept=".xls, .xlsx"
        WrapperBackgroundColor="#dfe6e9"
        labelColor="black"
        labelOpacity={1}>
        File Input Component
      </FileInput>
    </div>
  ),
  { notes: "File input component" }
);
