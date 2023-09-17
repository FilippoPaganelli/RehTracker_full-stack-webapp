import pino from 'pino'

export const logger = pino({
	nestedKey: 'payload',
	base: undefined,
	level: 'debug',
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
})

process.on('uncaughtException', error => {
	logger.error(error, 'UncaughtException')
	process.exit(1)
})
