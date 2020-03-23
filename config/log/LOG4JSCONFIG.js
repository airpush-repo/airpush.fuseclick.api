var LOG4JSCONFIG = {};
LOG4JSCONFIG.baseConf = {
    appenders: [

        //        {
        //        	type:"console"
        //        },
        {
            type: "dateFile",
            filename: "log/access.log",
            pattern: "-yyyy-MM-dd",
            category: "http"
        },
        {
            type: "file",
            filename: "log/app.log",
            maxLogSize: 10485760,
            numBackups: 3
        },
        {
            type: "logLevelFilter",
            level: "ERROR",
            appender: {
                type: "file",
                filename: "log/errors.log"
            }
        }

    ]

};

LOG4JSCONFIG.LEVEL = "DEBUG";


module.exports = LOG4JSCONFIG;