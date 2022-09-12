import { IEmailService } from "./IEmailService"
import { BitcoinService } from "./BitcoinService"
import { HostInterface } from "../models/HostInterface"
import { CryptoRepository } from "../repositories/CryptoRepository"
import Mail from "nodemailer/lib/mailer"
import SMTPTransport from "nodemailer"
import { error } from "console"

export class EmailService implements IEmailService {

    constructor(private repository: CryptoRepository, private bitcoinService: BitcoinService) { }

    public subscribeEmail(email: string): void {
        try {
            this.repository.saveEmail(email)
        } catch (err) {
            console.log(`An error occurred while trying to save the "${email}" email.`, err)
            throw err
        }
    }

    public async sendRateToSubcribers(): Promise<void> {
        const emails : Array<string> = this.repository.getAllEmails()
        try {
            const bitcoinRate : number = await this.bitcoinService.getBitcoinRate()
            emails.forEach((email : string) => this.sendEmail(this.getRateEmailTemplate(email, bitcoinRate)))
        } catch (err) {
            console.log('An error occurred while trying to broadcast the Bitcoin rate to subscribers.', error)
            throw error
        }
    }

    private sendEmail(emailDetails : Mail.Options) {
        
        const authorizationData = {
            type: 'OAuth2',
            user: process.env.USER,
            pass: process.env.PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }

        const transporter = SMTPTransport.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: authorizationData
        } as HostInterface)

        try {
            transporter.sendMail(emailDetails)
        } catch (err) {
            console.log(`An error occorred while trying to send the provided email: ${emailDetails}.`, err)
        }
    }

    private getRateEmailTemplate(receiverEmail : string, btcPrice : number) : Mail.Options {
        return {
            from: process.env.USER,
            to: receiverEmail,
            subject: 'BTC to UAH Price',
            text: `The current Bitcoin price is ${btcPrice} UAH.`,
            html: `<b>The current Bitcoin price is ${btcPrice} UAH.</b>`
        }
    }

}