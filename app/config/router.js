'use strict';

import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from '../config/store';
import { HomePage, PublicGame, CreatePage, PrivateGame, SearchPage, SettingsPage } from '../screens';
import routes from './routes';

export const router = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.SEARCH} component={SearchPage} />
        <Route path={routes.PLAY} component={PublicGame} />
        <Route path={routes.CREATE} component={CreatePage} />
        <Route path={routes.GAME} component={PrivateGame} />
        <Route path={routes.SETTINGS} component={SettingsPage} />
      </Switch>
    </Router>
  </Provider>);

