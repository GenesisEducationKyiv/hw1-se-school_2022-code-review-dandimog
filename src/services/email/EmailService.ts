import { IEmailService } from './IEmailService'
import { IEmailRepository } from '../../repositories/IEmailRepository'
import Mail from 'nodemailer/lib/mailer'
import { Transporter } from 'nodemailer'

export class EmailService implements IEmailService {
    constructor(
        private repository: IEmailRepository,
        private transporter: Transporter
    ) {}

    public getAllEmails(): string[] {
        try {
            return this.repository.getAllEmails()
        } catch (err) {
            console.log(
                `An error occurred while trying to get all emails.`,
                err
            )
            throw err
        }
    }

    public subscribeEmail(email: string): void {
        try {
            this.repository.saveEmail(email)
        } catch (err) {
            console.log(
                `An error occurred while trying to save the "${email}" email.`,
                err
            )
            throw err
        }
    }

    public sendRateToSubcribers(
        rate: number,
        subscribers: Array<string>
    ): void {
        try {
            subscribers.forEach((email: string) =>
                this.transporter.sendMail(this.fillEmailTemplate(email, rate))
            )
        } catch (err) {
            console.log(
                'An error occurred while trying to broadcast the Bitcoin rate to subscribers.',
                err
            )
        }
    }

    private fillEmailTemplate(
        receiverEmail: string,
        btcPrice: number
    ): Mail.Options {
        return {
            from: process.env.USER,
            to: receiverEmail,
            subject: 'BTC to UAH Price',
            text: `The current Bitcoin price is ${btcPrice} UAH.`,
            html: `<b>The current Bitcoin price is ${btcPrice} UAH.</b>`,
        }
    }
}
