'use strict'

const PORT = process.env.PORT || 8080
const chalk = require('chalk')

/**
 * 
 * @param {*} http 
 */
const startServer = http => {
  return http.listen(PORT, () => {
    console.log(
      chalk.green(
        `${process.env.NODE_ENV}, Picaso.io App listening on port ${PORT}`
      )
    )
  })
}

module.exports = startServer;
