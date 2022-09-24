export interface IEmailService {
    getAllEmails() : Array<string>
    subscribeEmail(email : string): void
    sendRateToSubcribers(rate: number, subscribers: Array<string>): void
}