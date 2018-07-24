"use strict";

import React from "react";
import { Provider } from "react-redux";

import { router } from "./config/router";
import store from "./config/store";

export const App = (
  <Provider store={store}>
    {router}
  </Provider>
);
