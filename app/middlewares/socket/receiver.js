import S from "../../constants/socket";

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
  const messages = Object.keys(S.RECEIVER);
  messages.forEach(function name(item) {
    socketOn(S.RECEIVER[item][0], S.RECEIVER[item][1], socket, store);
  });
};

export default receiver;
