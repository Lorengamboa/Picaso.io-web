const _ = require("lodash");


/**
 * @class Voter
 *
 */
class Voter {
  constructor(draws) {
    this.draws = draws;
  }

  resetVotes() {
    // this.draws = [];
  }

  rateDraw(voter, idDraw, rate) {
      if(_.find(this.draws, {voters: voter})) return; //

      const position = this.draws.findIndex(el => {
        return el.id === idDraw
      });

      this.draws[position].voters.push(voter);
      this.draws[position].points += rate;
    }
  }


module.exports = Voter;