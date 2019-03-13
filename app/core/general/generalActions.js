"use strict";

import * as ACTIONS from "./actions";
import { SOCKET_ERRORS }  from '../../constants/socket';

export function displaySnackBar(data) {
  const message = SOCKET_ERRORS[data];
  return {
    type: ACTIONS.DISPLAY_SNACKBAR,
    payload: message
  };
}
