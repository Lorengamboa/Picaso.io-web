'use strict';

const Timer = {
    countdown: 0,
    startCountdown: function (seconds) {
        var that = this;
        this.countdown = seconds;
        this.timer = setInterval(function (t) {
            that.countdown--;
            if (that.countdown === 0) clearInterval(that.timer);
        }, seconds * 100);
    }
}

module.exports = Timer;