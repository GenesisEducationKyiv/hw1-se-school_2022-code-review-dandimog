import { ValidationService } from '../services/validation/ValidationService'
import { Request, Response } from 'express'
import { BitcoinClient } from '../services/clients/abstract/BitcoinClient'
import { IEmailService } from '../services/email/IEmailService'
import { ICryptoController } from './ICryptoController'
import { AxiosResponse } from 'axios'

export class CryptoController implements ICryptoController {
    constructor(
        public bitcoinClient: BitcoinClient,
        public emailService: IEmailService,
        public emailValidator: ValidationService
    ) {}

    public getBitcoinRate = async (request: Request, response: Response) => {
        try {
            const result: AxiosResponse["data"] = await this.bitcoinClient.getBitcoinRate()
            const rate = this.bitcoinClient.retrieveRateFromResponse(result)
            response
                .status(200)
                .json({ bitcoinRate: rate.toString() + ' UAH' })
        } catch (err) {
            console.log(err)
            response
                .status(500)
                .json({ error: 'An Internal Server Error occurred while trying to get the Bitcoin rate.' })
        }
    }

    public subscribeEmail = (request: Request, response: Response) => {
        const email: string = request.body.email

        if (!email || !this.emailValidator.isEmailValid(email)) {
            response.status(400).json({
                error: "Invalid format. Please provide the request containing a valid 'email' field.",
            })
            return
        }

        try {
            this.emailService.subscribeEmail(email)
            response.status(200).end()
        } catch (err) {
            console.log(err)
            response
                .status(500)
                .json({ error: 'An Internal Server Error occurred while trying to subscribe the provided email.' })
        }
    }

    public sendRateToSubcribers = async (request: Request, response: Response) => {
        try {
            const bitcoinRate: number = await this.bitcoinClient.getBitcoinRate()
            const emails: Array<string> = this.emailService.getAllEmails()
            console.log(bitcoinRate)
            this.emailService.sendRateToSubcribers(bitcoinRate, emails)
            response.status(200).end()
        } catch (err) {
            console.log(err)
            response
                .status(500)
                .json({ error: 'An Internal Server Error occurred while trying to broadcast the Bitcoin rate to subscribers.' })
        }
    }
}
