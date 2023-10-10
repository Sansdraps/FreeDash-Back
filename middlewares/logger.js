const bunyan = require('bunyan');

/**
 * Errors Log levels :
 *
 * "fatal" (60):
 *     The service/app is going to stop or
 *     become unusable now. An operator should definitely look into this soon.
 * "error" (50): Fatal for a particular request,
 *     but the service/app continues servicing other requests.
 *     An operator should look at this soon(ish).
 * "warn" (40):
 *     A note on something that should probably
 *     be looked at by an operator eventually.
 * "info" (30):
 *     Detail on regular operation.
 * "debug" (20):
 *     Anything else, i.e. too verbose to be included in "info" level.
 * "trace" (10):
 *     Logging from external libraries used by
 *     your app or very detailed application logging.
 */

const logger = bunyan.createLogger({
    name: 'freeDash',
    streams: [
        {
            level: 'error', // ? We keep only the logs from the error level
            path: './log/error.log', // ? The path of the file
            type: 'rotating-file', // ? We specify that we are going to make a rotation of files (new file in a defined period + history of kept files)
            period: '7d', // ? Weekly log files rotation
            count: 4 // ? We keep a 4 log files history (here it's 1 month)
        }
    ]
});

module.exports = logger;
