require('dotenv/config')
const { Kafka, logLevel } = require('kafkajs')
const consola = require('consola')
const chalk = require('chalk')

const kafka = new Kafka({
	clientId: process.env.KAFKA_ID,
	brokers: [process.env.KAFKA_BROKERS],
	connectionTimeout: 7500,
	requestTimeout: 15000,
	ssl: false,
	logLevel: logLevel.ERROR
})

exports.kafkaProducer = async (evetName, data) => {
	try {
		const producer = await kafka.producer()

		if (process.env.NODE_ENV !== 'production') {
			producer.on('producer.connect', () => consola.info(chalk.green('producer connected')))
			producer.on('producer.disconnect', () => consola.info(chalk.red('producer disconnected')))
		}

		await producer.connect()
		await producer.send({
			topic: `kafka-${evetName}`,
			messages: [{ value: JSON.stringify(data) }],
			compression: 1
		})
		await producer.disconnect()
	} catch (error) {
		consola.info(chalk.red(error))
	}
}

exports.kafkaConsumer = (groupId, evetName) => {
	return new Promise(async (resolve, reject) => {
		try {
			const consumer = await kafka.consumer({ groupId })

			if (process.env.NODE_ENV !== 'production') {
				consumer.on('consumer.connect', () => consola.info(chalk.green('consumer connected')))
				consumer.on('consumer.disconnect', () => consola.info(chalk.red('consumer disconnected')))
				consumer.on('consumer.crash', () => consola.info(chalk.red('consumer crashed')))
			}

			await consumer.connect()
			await consumer.subscribe({ topic: `kafka-${evetName}`, fromBeginning: true })
			await consumer.run({
				eachMessage: async ({ topic, partition, message }) => resolve({ topic, partition, message })
			})
		} catch (error) {
			reject(error)
		}
	})
}
