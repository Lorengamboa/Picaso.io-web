"use strict";

const drawController = require("./draws/controller");
const routes = require("./config/routes");
const { API_DICTIONARY_v1, API_DRAWS_v1 } = require("./API");

module.exports = function(app, gm_ctrl) {
  /**********************************************************************/
  /*                    PICASO.IO APIS                                  */
  /**********************************************************************/

  app.use(routes.API_DICTIONARY, API_DICTIONARY_v1);

  app.use(routes.API_IMAGES, API_DRAWS_v1);

  app.use(routes.API_ROOMS_AVAILABLE, (req, res) => {
    res.json(gm_ctrl.getPublicGames());
  });

  /**********************************************************************/
  /*                  PICASO.IO SITE ENDPOINTS                          */
  /**********************************************************************/

  // Manage Image Site
  app.get(routes.DRAWS, drawController.getAllDraws);

  // Admin Site
  app.get(routes.ADMIN, function(request, response) {
    response.render("admin/index");
  });

  // // Login Site
  // app.get(routes.LOGIN, function(request, response) {
  //   response.sendFile("public/login/source/index.html");
  // });

  // HOME Site
  app.get(routes.WEB_APP, function(request, response) {
    response.sendFile("public/index.html", { root: "." });
  });
};
