const { kafkaConsumer } = require('./kafka')

;(async function () {
	try {
		const response = await kafkaConsumer('user-service-group', 'user-service')
		consola.success(response.message.value.toString())
	} catch (error) {
		consola.info(chalk.red(error))
	}
})()
