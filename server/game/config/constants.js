'use strict';

const DRAW_COLORS = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'BLACK'];

const GAME_AVATARS = ['andorian', 'anonymous','avatar2','kawaii','morty-smith','ninja-head','old-age','rick-sanchez','user-avatar', 'trump','tyler'];

const GAME_STATE = {
    WAITING: 'waitting',
    STARTING: 'starting',
    PLAYING: 'playing',
    VOTING: 'voting',
    PRESENTATING: 'presentating',
    PAUSED: 'paused',
    FINISHED: 'finished',
    DISPLAY: 'display',
  };

  
module.exports = { DRAW_COLORS, GAME_STATE, GAME_AVATARS };
