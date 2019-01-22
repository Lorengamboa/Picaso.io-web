'use strict';

const routes = require('../config/routes');
const { API_DICTIONARY_v1 } = require('../api');

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

  // HOME Site
  app.get(routes.WEB_APP, function (request, response) {
    response.sendFile("public/index.html", { "root": '.' });
  });

};


