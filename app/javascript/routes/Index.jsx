import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Library from "../components/Library";
import DrugDetails from "../components/DrugDetails";
import { Provider } from 'react-redux'

import { createStore } from 'redux'
import {rootReducer, initialState} from '../components/reducers'

const store = createStore(rootReducer, initialState)

export default (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/library" exact component={Library} />
        <Route path="/drug" exact component={DrugDetails} />
      </Switch>
    </Router>
  </Provider>
);