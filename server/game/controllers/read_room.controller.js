'use strict';

const isRoomEmpty = function (room) {
    if(room.players.length === 0) return true;
    return false;
}

module.exports = { isRoomEmpty };