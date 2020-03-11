const _ =require("lodash");
const moment = require("moment");
const melodong = require("../services/melodong");

let config = {};

config.mongoose = {
  uri: "mongodb://localhost:27017/offerDB",
  option: {
    useNewUrlParser: true,
    poolSize: 200,
    socketTimeoutMS: 5 * 60 * 1000,
    keepAlive: true,
    reconnectTries: 30,
    reconnectInterval: 500
  }
}

config.partnerList = [
  {
    partner: _.partial(melodong, "3a4f8687-fd69-48e9-84ea-c6ae6d8cef8c", "melodong"),
    name: 'melodong',
    next: moment().unix(),
    type: 4
  }
];

module.exports = config;