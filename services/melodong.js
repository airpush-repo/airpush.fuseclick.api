const _ = require("lodash");

module.exports = function (token, name, callback) {
  let next = false;
  console.log("token:", token)
  console.log("name:", name)
  callback(null, ["test1"], next);
}