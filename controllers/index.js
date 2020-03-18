const services = require("../services");

module.exports = async function () {
  try {
    await services.taskManager();
  } 
  catch (err) {
    console.log("err:", err.message);
  }
}