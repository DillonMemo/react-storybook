import { addParameters, configure } from "@storybook/react";

const req = require.context("../stories", true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}

addParameters({
  options: {
    name: "React Storybook - dillon(장동원)",
    url: "https://github.com/DillonMemo/react-storybook",
    goFullScreen: false
  }
});

configure(loadStories, module);
