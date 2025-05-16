import 'dotenv/config.js'
import { Logger, createLogger, format, transports } from 'winston'

const LOGGER_TIMESTAMP_FORMAT = 'D.MM.YYYY / HH:mm:ss'

const logFormat = format.printf(
  ({ timestamp, level, message }) => `Date[${timestamp}] Level[${level}]: Message[${message}]`
)

export const logger = (path: string): Logger => {
  const systemLogger = createLogger({
    level: 'info',
    transports: [new transports.File({ filename: `./logs/${path}.log` })],
    format: format.combine(format.timestamp({ format: LOGGER_TIMESTAMP_FORMAT }), logFormat)
  })

  if (process.env.NODE_ENV !== 'production') {
    systemLogger.add(
      new transports.Console({
        format: format.simple()
      })
    )
  }

  return systemLogger
}
