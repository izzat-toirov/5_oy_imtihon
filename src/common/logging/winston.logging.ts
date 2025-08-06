import * as DailyRotateFile from 'winston-daily-rotate-file';
import { utilities } from 'nest-winston';
import * as winston from 'winston';

const appLabel = 'ONE_Logistic';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(appLabel, {
          prettyPrint: true,
          colors: true,
        }),
      ),
    }),

    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.label({ label: appLabel }),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.label({ label: appLabel }),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    new DailyRotateFile.default({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
};