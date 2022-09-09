export interface IEmailService {
    subscribeEmail(email : string): void
    sendRateToSubcribers(): Promise<void>
}