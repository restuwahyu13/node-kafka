const { kafkaConsumer } = require('./kafka')

;(async function () {
	try {
		const response = await kafkaConsumer('user-service-group', 'user-service')
		const result = JSON.parse(response.message.value.toString())
		consola.success(`my name is ${result.name}`)
	} catch (error) {
		consola.info(chalk.red(error))
	}
})()
