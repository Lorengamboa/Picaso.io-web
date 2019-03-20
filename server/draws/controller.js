var request = require("request");

/**
 * Retrieves all the draws made so far
 */
const getAllDraws = (req, res) => {
  request("http://localhost:5001/api/draws/list", function(error, response, body) {
    if (error) res.render(err);
    const imagelist = JSON.parse(body);
    res.render("draws/index", { title: "Express", imagelist });
  });
};

/**
 *
 * @param {*} key
 */
const getSingleDraw = key => {};

/**
 *
 * @param {*} range
 */
const getSetOfDraws = range => {};

module.exports = { getAllDraws, getSetOfDraws, getSingleDraw };
