export interface IPublisher {
    publish(destination: string, content: string): Promise<void>
}