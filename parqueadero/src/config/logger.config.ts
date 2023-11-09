import winston from 'winston'

const logConfiguration = {
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(
            (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
    )
}

export default winston.createLogger(logConfiguration)
