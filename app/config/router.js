"use strict";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "../config/store";
import {
  HomePage,
  PublicGame,
  CreatePage,
  LinkGame,
  SearchPage,
  SettingsPage,
  HowToPlayPage,
  PolicyPage
} from "../screens";
import routes from "./routes";

import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_es from "react-intl/locale-data/es";

import messages_es from "../i18n/es.json";
import messages_en from "../i18n/en.json";

addLocaleData([...locale_en, ...locale_es]);

const messages = {
  es: messages_es,
  en: messages_en
};
const language = navigator.language.split(/[-_]/)[0]; // language without region code

export const router = (
  <Provider store={store}>
    <IntlProvider locale={language} messages={messages[language]}>
      <Router>
        <Switch>
          <Route exact path={routes.HOME} component={HomePage} />
          <Route path={routes.SEARCH} component={SearchPage} />
          <Route path={routes.PLAY} component={PublicGame} />
          <Route path={routes.CREATE} component={CreatePage} />
          <Route path={routes.GAME} component={LinkGame} />
          <Route path={routes.SETTINGS} component={SettingsPage} />
          <Route path={routes.POLICY} component={PolicyPage} />
          <Route path={routes.HOW_TO_PLAY} component={HowToPlayPage} />
        </Switch>
      </Router>
    </IntlProvider>
  </Provider>
);
