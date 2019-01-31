'use strict';

const User = require("./core/User");
const routes = require('./config/routes');
const { API_DICTIONARY_v1 } = require('./api');

module.exports = function (app, gm_ctrl) {
  /**********************************************************************/
  /*                    PICASO.IO API                                   */
  /**********************************************************************/

  app.use(routes.API_DICTIONARY, API_DICTIONARY_v1);

  app.use(routes.API_ROOMS_AVAILABLE, (req, res) => {
    res.json(gm_ctrl.getPublicGames());
  })

  /**********************************************************************/
  /*                  PICASO.IO SITE ENDPOINTS                               */
  /**********************************************************************/


  // Admin Site
  app.get(routes.ADMIN, function (request, response) {
    response.sendFile("public/admin/starter.html", { "root": '.' });
  });
  // Login Site
  app.get(routes.LOGIN, function (request, response) {
    response.sendFile("public/login/source/index.html");
  });
  // Profile site
  app.get(routes.PROFILE, User.getProfile);
  // Login
  app.post(routes.LOGIN, User.register);
  // Register new user
  app.post(routes.REGISTER, User.register);
  // Logout 
  app.get(routes.LOGOUT, User.logout);
  // HOME Site
  app.get(routes.WEB_APP, function (request, response) {
    response.sendFile("public/index.html", { "root": '.' });
  });


};


