import { injectable, inject } from "inversify-props"
import { IEmailService } from "./IEmailService"
import { ICryptoRepository } from "../repositories/ICryptoRepository"
import Mail from "nodemailer/lib/mailer"
import { Transporter }  from "nodemailer"
import { IBitcoinClient } from "./clients/IBitcoinClient"
import { CryptoRepository } from '../repositories/CryptoRepository'
// import { CoinApiClient } from "./CoinApiClient"
import { BinanceClient } from "./clients/BinanceClient"
import { Locator } from "../../config"


@injectable()
export class EmailService implements IEmailService {

    constructor(
        @inject(Locator.ICryptoRepository) private repository: ICryptoRepository, 
        @inject(Locator.BitcoinClient) private client: IBitcoinClient, 
        @inject(Locator.Transporter) private transporter: Transporter
    ) {}

    public subscribeEmail(email: string): void {
        try {
            this.repository.saveEmail(email)
        } catch (err) {
            console.log(`An error occurred while trying to save the "${email}" email.`, err)
            throw err
        }
    }

    public async sendRateToSubcribers(): Promise<void> {
        try {
            const emails : Array<string> = this.repository.getAllEmails()
            const bitcoinRate : number = await this.client.getBitcoinRate()
            emails.forEach((email : string) => this.transporter.sendMail(this.fillEmailTemplate(email, bitcoinRate)))
        } catch (err) {
            console.log('An error occurred while trying to broadcast the Bitcoin rate to subscribers.', err)
            throw err
        }
    }

    private fillEmailTemplate(receiverEmail : string, btcPrice : number) : Mail.Options {
        return {
            from: process.env.USER,
            to: receiverEmail,
            subject: 'BTC to UAH Price',
            text: `The current Bitcoin price is ${btcPrice} UAH.`,
            html: `<b>The current Bitcoin price is ${btcPrice} UAH.</b>`
        }
    }

}