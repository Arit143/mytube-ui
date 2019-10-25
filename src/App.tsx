import React from "react";
import { ApolloProvider } from "react-apollo";
import { HashRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Header from "./common/components/Header";

import client from "./common/api/client";
import { routes } from "./routes";
import { theme } from "./styles/theme";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Container fixed>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            ))}
          </Container>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
