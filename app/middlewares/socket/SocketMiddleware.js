"use strict";

import io from "socket.io-client";
//import { SOCKET_CONNECTION } from "../actions/player/actions";

const SocketMiddleware = socket => store => {
  const host = window.location.protocol + "//" + window.location.host;
  /*
    socket.on(DISPLAY_CHAT_MESSAGE, message => {
        console.log('From server', message);
        store.dispatch(captureMessage(message));
    }); */
  return next => action => {
    if (!socket && action.type !== "openSocketConnection") next(action);
    console.log("PANA1");

    // When dispatching a redux action.
    switch (action.type) {
      case "xa":
        try {
          console.log("PANA 3");

          socket = io(host);
          socket.emit("joinRandomRoom", store.getState().PlayerReducer.username);
          //next(action);
        } catch (error) {
          next(action);
        }
      default:
        next(action);
    }
  };
};

export default SocketMiddleware;
