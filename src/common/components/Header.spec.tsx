import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "@material-ui/styles";
import { HashRouter as Router, Route } from "react-router-dom";

import Header from "./Header";
import { theme } from "../../styles/theme";

it("Header should match snapshot", () => {
  const component = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
        </Router>
      </ThemeProvider>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
