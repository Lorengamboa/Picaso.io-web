"use strict";

const drawController = require("./draws/controller");
const loggerController = require("./logger/controller");
const routes = require("./config/routes");
const { sessionChecker, isLoggedIn } = require("./middlewares/sessions");
const { API_DICTIONARY_v1, API_DRAWS_v1 } = require("./API");
const db = require("./pg-pool");

module.exports = function(app, gm_ctrl) {
  
  // =========================================================================
  // ===============         GLOBAL APIS       ===============================
  // =========================================================================

  app.use(routes.API_DICTIONARY, API_DICTIONARY_v1);

  app.use(routes.API_IMAGES, API_DRAWS_v1);

  app.use(routes.API_ROOMS_AVAILABLE, (req, res) => {
    res.json(gm_ctrl.getPublicGames());
  });

  app.use(routes.API_ROOMS_INFO, (req, res) => {
    var roomName = req.body.roomname;

    res.json(gm_ctrl.getRoomInfo(roomName));
  });

  // =========================================================================
  // ====================        ADMIN         ===============================
  // =========================================================================

  /**
   * ADMIN INDEX
   */
  app.route(routes.ADMIN)
    .get(sessionChecker, function(request, response) {
      response.render("admin");
    })
    .post((req, res) => {
      var username = req.body.username,
        password = req.body.password;

      let params = [username, password];
      db.query(
        `SELECT * FROM account WHERE username = $1 AND password = $2`,
        params,
        (err, result) => {
          if (err || !result.rows.length) return res.render("admin");

          req.session.user = result.rows[0].username;
          res.redirect("dashboard");
        }
      );
    });

  /**
   * DASHBOARD
   */
  app.get(routes.DASHBOARD, isLoggedIn, (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.render("admin/dashboard");
    } else {
      res.redirect("/admin");
    }
  });

  /**
   * DRAWPANEL DRAWS
   */
  app.route(routes.DRAWS).get(isLoggedIn, drawController.getAllDraws);

  /**
   * LOGPANEL
   */
  app.route(routes.LOGPANEL)
    .get(isLoggedIn, loggerController.listAllLogs);

  /**
   * LOGPANEL FILE
   */
  app.route(routes.LOGPANEL_FILE)
    .get(isLoggedIn, loggerController.retrieveLogfile);

  // =========================================================================
  // ====================     APPLICATION      ===============================
  // =========================================================================

  app.get(routes.WEB_APP, function(request, response) {
    response.sendFile("public/index.html", { root: "." });
  });
};
