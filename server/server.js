'use strict';

const PORT = process.env.PORT || 8080;;
const chalk = require('chalk');

const startServer = http => {
    http.listen(PORT, () => {
        console.log(chalk.green(`Picaso.io App listening on port ${PORT}`));
    });
}

module.exports = startServer;