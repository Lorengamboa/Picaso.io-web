"use strict";

const initialState = {
  game: {
    gameInfo: {
      roomTag: ""
    },
    toolPicked: "pencil",
    colorPicked: "#000",
    penWidth: "1px",
    playerList: [],
    messages: [],
    lastDraw: null,
    countDown: undefined,
    gamePlay: "waitting",
    playersDraw: [],
    currentWord: "Waitting round to start",
    modal: false,
    fullscreen: false
  },
  player: {
    username: "",
    connection: null,
    loading: false,
    sound: true
  },
  socket: {
    connection: null,
    loading: false,
  }
};

export default initialState;
