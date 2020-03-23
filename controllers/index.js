const services = require("../services");
const schedule = require('node-schedule');
const LocalLogger = require("../utils/LocalLogger");
const log = LocalLogger.getLogger("ctl_taskManager");

module.exports = function () {
  try {
    let j = schedule.scheduleJob('0 0 * * * *', async function () {
      log.debug("start scheduleJob method");
      await services.taskManager();
      await services.rmInvalidData();
      log.debug("end scheduleJob method");
    });
  }
  catch (err) {
    log.error("scheduleJob err:", err.message);
  }
}