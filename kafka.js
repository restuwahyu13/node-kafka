require('dotenv/config')
const { Kafka } = require('kafkajs')
const consola = require('consola')

class KafkaClient {
	config
	kafka
	producer
	consumer
	transaction

	constructor(config) {
		this.config = config
		this.kafka = new Kafka(this.config)
	}

	async publisher(options) {
		try {
			this.producer = this.kafka.producer(options.producerConfig || {})
			this.notification('publisher', this.producer)

			await this.producer.connect()
			options.type == 'single' ? await this.producer.send(options.sendConfig) : await this.producer.sendBatch(options.sendConfig)

			await this.producer.disconnect()
		} catch (e) {
			consola.error(`publisher is not working: ${e.message}`)
		}
	}

	async publisherTransaction(options) {
		try {
			this.producer = this.kafka.producer(options.producerConfig || {})
			this.transaction = await this.producer.transaction()

			try {
				this.notification('publisher', this.producer)
				await this.producer.connect()

				options.type == 'single'
					? await this.producer.send(options.sendConfig)
					: await this.producer.sendBatch(options.sendConfig)

				await this.transaction.commit()
				await this.producer.disconnect()
			} catch (e) {
				if (this.transaction.isActive()) await this.transaction.abort()
				consola.error(`publisher transaction is not working: ${e.message}`)
			}
		} catch (e) {
			consola.error(`publisher transaction is not working: ${e.message}`)
		}
	}

	async subscriber(options, cb) {
		try {
			this.consumer = this.kafka.consumer(options.consumerConfig)
			this.notification('subscriber', this.consumer)

			await this.consumer.connect()
			await this.consumer.subscribe(options.subscribeConfig)
			await this.consumer.run({ ...(options.runConfig || {}), eachMessage: cb })
		} catch (e) {
			consola.error(`subscriber is not working: ${e.message}`)
		}
	}

	notification(type, handler) {
		if (type == 'subscriber') {
			this.consumer = handler
			this.consumer.on('consumer.connect', () => consola.info('consumer kafka connected'))
			this.consumer.on('consumer.network.request_timeout', () => consola.error('consumer kafka network timeout'))
			this.consumer.on('consumer.crash', () => consola.error('consumer kafka crash'))
			this.consumer.on('consumer.disconnect', () => consola.error('consumer kafka disconnect'))
			this.consumer.on('consumer.stop', () => consola.error('consumer kafka stop'))
		}

		if (type == 'publisher') {
			this.producer = handler
			this.producer.on('producer.connect', () => consola.info('producer kafka connected'))
			this.producer.on('producer.network.request_timeout', () => consola.error('producer kafka network timeout'))
		}
	}
}

exports.KafkaClient = KafkaClient
