type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogMessage {
    level: LogLevel
    message: string
    data?: Record<string, unknown>
    timestamp: string
}

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development'

    private formatMessage(level: LogLevel, message: string, data?: Record<string, unknown>): LogMessage {
        return {
            level,
            message,
            data,
            timestamp: new Date().toISOString()
        }
    }

    private log(level: LogLevel, message: string, data?: Record<string, unknown>) {
        const logMessage = this.formatMessage(level, message, data)
        
        if (this.isDevelopment) {
            const colors = {
                debug: '\x1b[36m', // cyan
                info: '\x1b[32m',  // green
                warn: '\x1b[33m',  // yellow
                error: '\x1b[31m', // red
                reset: '\x1b[0m'
            }

            console.log(
                `${colors[level]}[${logMessage.level.toUpperCase()}]${colors.reset}`,
                `[${new Date(logMessage.timestamp).toLocaleTimeString()}]`,
                message,
                data ? JSON.stringify(data, null, 2) : ''
            )
        } else {
            console.log(JSON.stringify(logMessage))
        }
    }

    debug(data: Record<string, unknown>, message: string) {
        if (this.isDevelopment) {
            this.log('debug', message, data)
        }
    }

    info(data: Record<string, unknown>, message: string) {
        this.log('info', message, data)
    }

    warn(data: Record<string, unknown>, message: string) {
        this.log('warn', message, data)
    }

    error(data: Record<string, unknown>, message: string) {
        this.log('error', message, data)
    }
}

const logger = new Logger()
export default logger 