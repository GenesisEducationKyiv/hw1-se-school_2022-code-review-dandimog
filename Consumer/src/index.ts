import client, { Channel, Connection } from 'amqplib'
import { ConsumeMessage } from 'amqplib/properties'

async function consume() {

    const amqpUrl: string = process.env.AMQP_URL ?? 'amqp://localhost:5672'
    const connection: Connection = await client.connect(amqpUrl)
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue('Axios_logs')

    channel.consume("Axios_logs", (message: ConsumeMessage | null) => {
        if (message) {
            console.log(`Received message: ${message.content.toString()}`)
            channel.ack(message)
        } else {
            console.log(message)
        }
    })

}

consume()