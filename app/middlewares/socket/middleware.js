"use strict";

import SocketManagerFactory from "./SocketManagerFactory";
import {
  SOCKET_CONNECTION,
  CONNECT_PRIVATE_ROOM,
  CREATE_ROOM
} from "../../core/player/actions";
import {
  PLAYER_SEND_MESSAGE,
  PLAYER_DRAW_CANVAS,
  PLAYER_CLEAR_CANVAS
} from "../../core/game/actions";

const SocketMiddleware = url => store => {
  let sm; // SocketManage  
  return next => action => {
    // When dispatching a redux action.
    switch (action.type) {
      case SOCKET_CONNECTION:
        let { username } = store.getState().playerReducer;
        sm = SocketManagerFactory(url, store);
        sm.joinRandomRoom(username);
        action.payload = true;
        next(action);
        break;
      case CONNECT_PRIVATE_ROOM:
        sm = SocketManagerFactory(url, store);
        sm.joinPrivateRoom(username);
        next(action);
        break;
      case CREATE_ROOM:
        sm = SocketManagerFactory(url, store);
        sm.createRoom(action.payload);
        next(action);
        break;
      case PLAYER_SEND_MESSAGE:
        sm.sendMessage(action.payload);
        break;
      case PLAYER_DRAW_CANVAS:
        sm.drawCanvas(action.payload);
        break;
      case PLAYER_CLEAR_CANVAS:
        sm.clearCanvas();
        break;
      default:
        next(action);
    }
  };
};

export default SocketMiddleware;
