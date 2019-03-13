import { SOCKET_EVENTS } from "../../constants/socket";

/**
 * Helper function to make socket.on bind calls
 * @param {*} event 
 * @param {*} action 
 * @param {*} socket 
 * @param {*} store 
 */
const socketOn = (event, action, socket, store) => {
  socket.on(event, data => {
    store.dispatch(action(data));
  });
};

/**
 * Opens socket listeners for every possible event
 * @param {*} socket
 * @param {*} store
 */
const receiver = (socket, store) => {
  const messages = Object.keys(SOCKET_EVENTS.RECEIVER);
  messages.forEach(function name(item) {
    socketOn(SOCKET_EVENTS.RECEIVER[item][0], SOCKET_EVENTS.RECEIVER[item][1], socket, store);
  });
};

export default receiver;
