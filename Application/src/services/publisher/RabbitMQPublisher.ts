import client, {Channel, Connection } from 'amqplib'
import { IPublisher } from './IPublisher'

export class RabbitMQPublisher implements IPublisher {
    
    private amqpUrl: string

    constructor() {
        this.amqpUrl = process.env.AMQP_URL ?? 'amqp://rabbitmq:5672'
    }

    public async publish(destination: string, content: string) {
        const connection: Connection = await client.connect(this.amqpUrl)
        const channel: Channel = await connection.createChannel()
        await channel.assertQueue(destination)
        channel.sendToQueue(destination, Buffer.from(content))
        await channel.close()
        await connection.close()
    }
    
}
