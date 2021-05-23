import React from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline  from '@material-ui/core/CssBaseline';

import theme from "./assets/theme";
import RestaurantList from "./components/workshops/RestaurantList";
import RestaurantDetails from "./components/workshops/RestaurantDetails";
import RestaurantEdits from "./components/workshops/RestaurantEdits";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
    <Switch>
      <Route exact path="/">
  		<RestaurantList />
      </Route>
      <Route exact path="/restaurant/create">
      <RestaurantEdits />
      </Route>
      <Route exact path="/restaurant/:id">
  		<RestaurantDetails />
      </Route>
      <Redirect to="/" />
    </Switch>
    </Router>
  </ThemeProvider>
  );
}

export default App;
