'use strict';

const { SOCKET_EVENTS } = require('../../events');

/**
 * Timer helper function
 */
const Timer = function () {
    return {
        countdown: 0,
        startCountdown: function (seconds, gameModeFnc) {
            var that = this;
            this.countdown = seconds;
            setInterval(function (t){
                that.io.to(that.name).emit(SOCKET_EVENTS.UPDATE_TIMER, that.countdown);
                if (that.countdown === 0) {
                    clearInterval(that.timer);
                    gameModeFnc.call(that);
                }
                that.countdown--;
            }, 1000);
        }
    }
};

module.exports = Timer;