'use strict';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePage, LobbyPage } from './Sites';

const router = (
  <Router>
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/game" component={LobbyPage} />
    </Switch>
  </Router>
)

ReactDOM.render(router, document.getElementById("root"));