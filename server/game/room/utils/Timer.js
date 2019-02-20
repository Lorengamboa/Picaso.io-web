"use strict";

const { SOCKET_EVENTS } = require("../../../events");

/**
 * Timer helper function
 */
const Timer = function() {
  return {
    countdown: 0,
    intervalId: null,
    startCountdown: function(seconds, gameModeFnc) {
      var that = this;
      this.countdown = seconds;
      this.timer.intervalId = setInterval(() => {
        that.io.to(that.name).emit(SOCKET_EVENTS.UPDATE_TIMER, that.countdown);
        if (that.countdown === 0) {
          that.timer.clearInterval();
          gameModeFnc.call(that);
        }
        that.countdown--;
      }, 1000);
    },
    clearInterval: function() {
      clearInterval(this.intervalId);
    }
  };
};

module.exports = Timer;
