'use strict';


/**
 * 
 * @param {*} roomId 
 */
const deleteRoom = function (roomId) {
    const filterRooms = this.games.public.filter(game => {
        if (game.name === roomId) return false;
    });

    this.games.public = filterRooms;
}

module.exports = deleteRoom;