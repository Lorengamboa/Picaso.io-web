"use strict";

const initialState = {
  game: {
    gameInfo: {
      roomTag: ""
    },
    round: 0,
    toolPicked: "pencil",
    colorPicked: "#000",
    penWidth: "5",
    playerList: [],
    messages: [],
    lastDraw: null,
    countDown: undefined,
    gamePlay: "waitting",
    playersDraw: [],
    playerDraw: [],
    podium: [],
    currentWord: "Need's 3 players",
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
