'use strict';

const DRAW_COLORS = [  "#000",
"#FFFFFF",
"#C0C0C0",
"#808080",
"#FF0000",
"#800000",
"#FFFF00",
"#808000",
"#00FF00",
"#008000",
"#00FFFF",
"#008080",
"#0000FF",
"#000080",
"#FF00FF",
"#800080"];
"use strict";

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

const DEVICES = ["android", "mobile_safari", "computer"];

  
module.exports = { DRAW_COLORS, GAME_STATE, GAME_AVATARS, DEVICES };
