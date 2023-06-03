const { KafkaClient } = require('./kafka.js')
const { faker } = require('@faker-js/faker')
const consola = require('consola')

;(async () => {
	const consumerGroups = []

	for (let i = 0; i < 5; i++) {
		consumerGroups.push(
			new KafkaClient({
				brokers: [process.env.KAFKA_BROKERS_1, process.env.KAFKA_BROKERS_2],
				clientId: faker.string.uuid(),
				ssl: false
			}).subscriber(
				{
					subscribeConfig: { topic: 'user-service', fromBeginning: true },
					consumerConfig: { groupId: 'user-service-group-new', rebalanceTimeout: 30000 },
					runConfig: { autoCommit: true }
				},
				(payload) => consola.info(JSON.parse(payload.message.value.toString()))
			)
		)
	}

	await Promise.all(consumerGroups)
})()
