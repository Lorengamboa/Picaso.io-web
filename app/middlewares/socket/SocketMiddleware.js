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
    if(!socket && action.type !== 'openSocketConnection') next(action);
    
    console.log("Hey",store.getState().PlayerReducer.username)
    // When dispatching a redux action.
    switch (action.type) {
      case 'xaxaaxa':
        socket = io(host);
        socket.emit("joinRandomRoom", action.payload);
      default:
        next(action);
    }
  };
};

export default SocketMiddleware;
