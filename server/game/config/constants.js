'use strict';

const DRAW_COLORS = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'BLACK'];

const GAME_STATE = {
  WAITING: 'waitting',
  STARTING: 'starting',
  PLAYING: 'playing',
  VOTING: 'voting',
  PAUSED: 'paused',
  FINISHED: 'finished',
  DISPLAY: 'display',
};

const GAME_AVATARS = ['andorian', 'anonymous','avatar2','kawaii','morty-smith','ninja-head','old-age','rick-sanchez','user-avatar', 'trump','tyler'];

module.exports = { DRAW_COLORS, GAME_STATE, GAME_AVATARS };
