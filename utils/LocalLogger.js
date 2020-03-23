var log4js = require('log4js');
var LOG4JSCONFIG =require("../config/log/LOG4JSCONFIG");
log4js.configure(LOG4JSCONFIG.baseConf);

// log4js output level is 6: trace, debug, info, warn, error, fatal
var LEVEL = LOG4JSCONFIG.LEVEL;

var LocalLogger = function(){
    this.getLogger = function(category){
        var tmpLogger = log4js.getLogger(category);
        tmpLogger.setLevel(LEVEL);
        return tmpLogger;
    }
}

module.exports = new LocalLogger;