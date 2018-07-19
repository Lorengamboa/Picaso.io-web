'use strict';

import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from '../config/store';
import { HomePage, PlayPage, CreatePage } from '../scenes';

export const router = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/play" component={PlayPage} />
        <Route path="/create" component={CreatePage} />
        <Route path="/game/:idgame" component={PlayPage} />
      </Switch>
    </Router>
  </Provider>);

