require('dotenv/config')
const { KafkaClient } = require('./kafka.js')
const { faker } = require('@faker-js/faker')

let kafka = new KafkaClient({
	brokers: [process.env.KAFKA_BROKERS_1, process.env.KAFKA_BROKERS_2],
	clientId: faker.string.uuid(),
	ssl: false
})

;(async () => {
	await kafka.subscriber(
		{
			subscribeConfig: { topic: 'user-service', fromBeginning: true },
			consumerConfig: { groupId: 'user-service-group', rebalanceTimeout: 30000 },
			runConfig: { autoCommit: true }
		},
		(payload) => console.log(JSON.parse(payload.message.value.toString()))
	)
})()
