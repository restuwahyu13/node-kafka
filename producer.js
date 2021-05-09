const { kafkaProducer } = require('./kafka')

;(async function () {
	try {
		const userData = {
			name: 'restu wahyu saputra',
			age: 25,
			hobby: 'coding'
		}
		await kafkaProducer('user-service', userData)
	} catch (error) {
		consola.info(chalk.red(error))
	}
})()
