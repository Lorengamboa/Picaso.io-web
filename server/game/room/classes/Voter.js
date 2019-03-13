const _ = require("lodash");


/**
 * @class Voter
 *
 */
class Voter {
  constructor() {
    this.draws = {};
    this.cache = {};
  }

  /**
   * 
   */
  resetCache() {
    for (var key in this.cache) {
      if (this.cache.hasOwnProperty(key)) {
         this.cache[key].points = 0; 
      }
    }
  }

  /**
   * 
   */
  addPlayer(idPlayer) {
    this.draws[idPlayer] = {"voters": [], "points": 0};
    this.cache[idPlayer] = {"points": 0};
  }

  /**
   * 
   */
  rateDraw(voter, idplayer, rate) {
      const draw = this.draws[idplayer];
      if(_.find(this.draws, {voters: voter}) || !draw) return; //

      draw.voters.push(voter);
      draw.points += rate;

      const draw_cached = this.cache[idplayer];
      draw_cached.points += rate;
    }
  }


module.exports = Voter;