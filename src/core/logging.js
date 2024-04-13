const config = require('config');
const winston = require('winston');
const { combine, timestamp, colorize, printf } = winston.format;

const NODE_ENV = config.get('env');

let rootLogger;

/**
 * Get the root logger.
 */
const getLogger = () => {
  if (!rootLogger) {
    throw new Error('You must first initialize the logger');
  }

  return rootLogger;
};

/**
 * Define the logging format. We output a timestamp, context (name), level, message and the stacktrace in case of an error
 */
const loggerFormat = () => {
  const formatMessage = ({
    level,
    message,
    timestamp,
    name = 'server',
    ...rest
  }) =>
    `${timestamp} | ${name} | ${level} | ${message} | ${JSON.stringify(rest)}`;

  const formatError = ({ error: { stack }, ...rest }) =>
    `${formatMessage(rest)}\n\n${stack}\n`;
  const format = (info) =>
    info.error instanceof Error ? formatError(info) : formatMessage(info);
  return combine(colorize(), timestamp(), printf(format));
};

/**
 * Initialize the root logger.
 *
 * @param {string} level - The log level.
 * @param {boolean} disabled - Disable all logging.
 * @param {object} defaultMeta - Default metadata to show.
 */
const initializeLogger = ({
  level,
  disabled = false,
  defaultMeta = {}
}) => {
  const transports = NODE_ENV === 'test' ? [
    new winston.transports.File({
      filename: 'test.log',
      silent: disabled,
    }),
  ] : [
    new winston.transports.Console({
      silent: disabled,
    }),
  ];

  rootLogger = winston.createLogger({
    level,
    format: loggerFormat(),
    defaultMeta,
    transports,
  });

  return rootLogger;
};

module.exports = {
  initializeLogger,
  getLogger,
};
