const _ = require("lodash");


/**
 * @class Voter
 *
 */
class Voter {
  constructor() {
    this.draws = {};
  }

  /**
   * 
   */
  resetVotes() {
    // this.draws = [];
  }

  /**
   * 
   */
  addPlayer(idPlayer) {
    this.draws[idPlayer] = {"voters": [], "points": 0};
  }

  /**
   * 
   */
  rateDraw(voter, idplayer, rate) {
      const draw = this.draws[idplayer];
      if(_.find(this.draws, {voters: voter}) || !draw) return; //

      draw.voters.push(voter);
      draw.points += rate;
    }
  }


module.exports = Voter;