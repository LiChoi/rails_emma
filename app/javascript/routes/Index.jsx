import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Library from "../components/Library";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/library" exact component={Library} />
    </Switch>
  </Router>
);