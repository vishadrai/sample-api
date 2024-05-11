var bunyan = require("bunyan");
var RotatingFileStream = require("bunyan-rotating-file-stream");

const getStreams = () => {
  const streams = [
    {
      stream: new RotatingFileStream({
        path: "./sample.log",
        period: "1d", // file rotation for 1 day.
        totalFiles: 10,
        rotateExisting: true,
        threshold: "1m", //Limit of 1MB of each file size , will create file.1 , file.2 etc;
        totalSize: "20m", //20MB total file sizes.
        gzip: true,
        serializers: {
          req: bunyan.stdSerializers.req,
          method: bunyan.stdSerializers.req,
          userInfo: bunyan.stdSerializers.req,
          res: bunyan.stdSerializers.res,
          err: bunyan.stdSerializers.err,
        },
      }),
    },
  ];
  return streams;
};

var logger = bunyan.createLogger({
  name: "blue",
  streams: getStreams(),
});

module.exports = { logger };
