'use strict';

import io from "socket.io-client";
import SocketManager from './socketManager';

import { SOCKET_CONNECTION, CONNECT_PRIVATE_ROOM } from "../../actions/player/actions";
import { PLAYER_SEND_MESSAGE, PLAYER_DRAW_CANVAS, PLAYER_CLEAR_CANVAS } from "../../actions/game/actions";

const SocketMiddleware = url => store => {
  let sm; // socketManager instance
  let ws; // websocket instance

  return next => action => {
    // When dispatching a redux action.

    switch (action.type) {
      case SOCKET_CONNECTION:
        ws = io(url);
        sm = new SocketManager(ws, store);
        sm.joinRandomRoom(store.getState().PlayerReducer.username);
        action.payload = true;
        next(action);
        break;
      case CONNECT_PRIVATE_ROOM:
        ws = io(url);
        sm = new SocketManager(ws, store);
        sm.joinPrivateRoom(store.getState().PlayerReducer.username, action.payload);
        action.payload = true;
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
