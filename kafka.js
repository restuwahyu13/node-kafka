const { Kafka } = require('kafkajs')

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
			// await this.notification('publisher', this.producer)
			await this.producer.connect()

			options.type == 'single' ? await this.producer.send(options.sendConfig) : await this.producer.sendBatch(options.sendConfig)

			await this.producer.disconnect()
		} catch (e) {
			console.error(`publisher is not working: ${e}`)
		}
	}

	async publisherTransaction(options) {
		try {
			this.producer = this.kafka.producer(options.producerConfig || {})
			this.transaction = await this.producer.transaction()
			try {
				await this.notification('publisher', this.producer)
				await this.producer.connect()

				options.type == 'single'
					? await this.producer.send(options.sendConfig)
					: await this.producer.sendBatch(options.sendConfig)

				await this.transaction.commit()
				await this.producer.disconnect()
			} catch (e) {
				if (this.transaction.isActive()) this.transaction.abort()
				console.error(`publisher transaction is not working: ${e}`)
			}
		} catch (e) {
			console.error(`publisher transaction is not working: ${e}`)
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
			console.error(`subscriber is not working: ${e}`)
		}
	}

	async notification(type, handler) {
		try {
			if (type == 'subscriber') {
				this.consumer = handler
				this.consumer.on('consumer.connect', () => console.info('consumer kafka connected'))
				this.consumer.on('consumer.network.request_timeout', () => console.error('consumer kafka network timeout'))
				this.consumer.on('consumer.crash', () => console.error('consumer kafka crash'))
				this.consumer.on('consumer.disconnect', () => console.error('consumer kafka disconnect'))
				this.consumer.on('consumer.stop', () => console.error('consumer kafka disconnect'))
			}

			if (type == 'publisher') {
				this.producer = handler
				this.producer.on('producer.connect', () => console.info('producer kafka connected'))
				this.producer.on('producer.network.request_timeout', () => console.error('producer kafka network timeout'))
				this.producer.on('producer.disconnect', () => console.error('producer kafka disconnect'))
			}
		} catch (e) {
			console.error(`notification is not working: ${e}`)
		}
	}
}

exports.KafkaClient = KafkaClient
