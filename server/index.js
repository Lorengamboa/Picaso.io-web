'use strict';

const PORT = process.env.PORT || 8080;

module.exports =  app => {
    app.listen(PORT,  () => {
        console.log(`Picaso.io App listening on port ${PORT}`);
    });
}
