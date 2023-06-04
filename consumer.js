const { KafkaClient } = require('./kafka.js')
const { faker } = require('@faker-js/faker')
const consola = require('consola')

let kafka = new KafkaClient({
	brokers: [process.env.KAFKA_BROKERS_1, process.env.KAFKA_BROKERS_2],
	clientId: faker.string.uuid(),
	ssl: false
})

;(async () => {
	await kafka.subscriber(
		{
			subscribeConfig: { topic: 'user-service', fromBeginning: true },
			consumerConfig: { groupId: 'user-service-group' },
			runConfig: { autoCommit: true }
		},
		(payload) => consola.info(JSON.parse(payload.message.value.toString()))
	)
})()
