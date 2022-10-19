import { IEmailService } from './IEmailService'
import { IEmailRepository } from '../../repositories/email/IEmailRepository'
import Mail from 'nodemailer/lib/mailer'
import { Transporter } from 'nodemailer'
import { HttpException } from '../../models/erorrs/HttpException'
import { HttpStatus } from '../../models/erorrs/HttpStatus'
import { logger } from '../loggers/concrete/FileLogger'

export class EmailService implements IEmailService {
    constructor(
        private repository: IEmailRepository,
        private transporter: Transporter
    ) {}

    public getAllEmails(): string[] {
        try {
            return this.repository.getAllEmails()
        } catch (err) {
            logger.error(err as string)
            throw new HttpException(
                HttpStatus.BAD_REQUEST, 
                `An error occurred while trying to get all emails.`
            )
        }
    }

    public subscribeEmail(email: string): void {
        try {
            this.repository.saveEmail(email)
        } catch (err) {
            logger.error(err as string)
            if (err instanceof HttpException) throw err
            throw new HttpException(
                HttpStatus.BAD_REQUEST,
                `An error occurred while trying to save the "${email}" email.`
            )
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
            logger.error(err as string)
            throw new HttpException(
                HttpStatus.BAD_REQUEST, 
                'An error occurred while trying to broadcast the Bitcoin rate to subscribers.'
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
