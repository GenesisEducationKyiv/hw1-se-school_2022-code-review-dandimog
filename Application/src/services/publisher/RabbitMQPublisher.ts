import client, {Channel, Connection } from 'amqplib'
import { Observer } from '../../models/observer/Observer'
import { IPublisher } from './IPublisher'

export class RabbitMQPublisher implements IPublisher, Observer {
    
    private amqpUrl: string
    
    constructor() {
        this.amqpUrl = process.env.AMQP_URL ?? 'amqp://localhost:5672'
    }

    public async update(message: string): Promise<void> {
        await this.publish('LOGS', message)
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
