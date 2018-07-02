'use strict';

/**
 * Timer helper function
 */
const Timer = {
    countdown: 0,
    startCountdown: function (seconds) {
        var that = this;
        this.countdown = seconds;
        this.timer = setInterval((t) => {
            if (that.countdown === 0) clearInterval(that.timer);
            this.io.emit('updateTimer', that.countdown);
            that.countdown--;
        }, 1000);
    }
};

module.exports = Timer;