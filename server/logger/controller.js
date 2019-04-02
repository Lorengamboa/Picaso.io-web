const fs = require("fs");
const path = require("path");

const LOG_DIR = "logs";

/**
 *
 * @param {*} req
 * @param {*} res
 */
const listAllLogs = (req, res) => {
  fs.readdir(LOG_DIR, (err, list) => {
    var logList = list.filter(extension);
    console.log(logList);
    res.render("admin/dashboard/logs", { list: logList });
  });
};

function extension(element) {
  var extName = path.extname(element);
  return extName === ".log";
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
const retrieveLogfile = (req, res) => {
  const filename = req.params.filename;

  fs.readFile(`${LOG_DIR}/${filename}`, { encoding: "utf-8" }, function read(
    err,
    data
  ) {
    if (err) {
      res.send("error");
    }
    content = data;
    res.render("admin/dashboard/logs/logviewer.pug", { content });
  });
};

module.exports = { listAllLogs, retrieveLogfile };
