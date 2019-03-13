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
    playerDraw: [],
    podium: [],
    currentWord: "Need atleast 3 players to start game",
    modal: false,
    fullscreen: false
  },
  player: {
    username: "",
    connection: null,
    drunk: false,
    loading: false,
    sound: true
  },
  socket: {
    connection: null,
    loading: false,
  },
  general: {
    level: null,
    message: "",
    timestamp: null
  }
};

export default initialState;
