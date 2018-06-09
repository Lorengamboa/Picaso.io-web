'use strict';

const Game = require("./Game");
const { createRandomString, rndValueArray } = require("./utils");

module.exports.lobbyController = {
        //
        lobbies: [],
        // Creates new lobby
        createNewLobby: () => {
            const roomName = createRandomString();
            const game = new Game(roomName);

            this.lobbies.push(game);
        },
        // Player joins a random lobby
        playerJoinRandomLobby: (player) => {
            if (lobbies.length < 1) this.createNewLobby();

            var lobby = rndValueArray(lobbies);
            this.playerJoinLobby(player, lobby);
        },
        // Player leaves a lobby
        playerJoinLobby: (player, lobby) => {
            player.joinLobby(lobby);
        },
        //
        playerLeaveLobby: (player) => {
            player.leaveLobby(player.lobby);
        },
        //
        deleteLobbyPlayer: () => {

        }
    }

