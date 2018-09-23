'use strict';

const { API_DICTIONARY_v1, API_DRAW_SAMPLES } = require('../api');

module.exports = function (app, gm_ctrl) {

  /**********************************************************************/
  /*                    PICASO.IO API                                   */
  /**********************************************************************/

  app.use('/api/dictionary', API_DICTIONARY_v1);

  app.use('/api/sample', API_DRAW_SAMPLES);

  app.use('/api/rooms_available', (req, res) => {
    res.json(gm_ctrl.getPublicGames());
  })

  /**********************************************************************/
  /*                  PICASO.IO SITE ENDPOINTS                               */
  /**********************************************************************/

  // Admin Site
  app.get('/admin', function (request, response) {
    response.sendFile("public/admin/starter.html", { "root": '.' });
  });

  // HOME Site
  app.get('*', function (request, response) {
    response.sendFile("public/index.html", { "root": '.' });
  });

};


