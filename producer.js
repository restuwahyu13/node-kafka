const { KafkaClient } = require('./kafka.js')
const { faker } = require('@faker-js/faker')
const consola = require('consola')

let kafka = new KafkaClient({
	brokers: [process.env.KAFKA_BROKERS_1, process.env.KAFKA_BROKERS_2],
	clientId: faker.string.uuid(),
	ssl: false
})

setInterval(async () => {
	;(async () => {
		const messages = {
			value: JSON.stringify({
				userId: faker.string.uuid(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				avatar: faker.image.avatar(),
				password: faker.internet.password(),
				birthdate: faker.date.birthdate(),
				registeredAt: faker.date.past()
			})
		}

		await kafka.publisher({
			type: 'single',
			sendConfig: {
				topic: 'user-service',
				messages: [
					{
						value: JSON.stringify(messages)
					}
				]
			}
		})

		consola.info('Publish successfully: ', new Date().toISOString())
	})()
}, 3000)
