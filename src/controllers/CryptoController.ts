import { ValidationService } from "../services/ValidationService"
import { Request, Response } from 'express'
import { IEmailService } from '../services/IEmailService'
import { IBitcoinClient } from '../services/IBitcoinClient'

export class CryptoController {

    constructor(
        public bitcoinService: IBitcoinClient,
        public emailService: IEmailService,
        public emailValidator: ValidationService
    ) {}

    private getBitcoinRate = async (
        request: Request,
        response: Response
    ) => {
        try {
            const result = await this.bitcoinService.getBitcoinRate()
            response
                .status(200)
                .json({ bitcoinRate: result.toString() + ' UAH' })
        } catch (err) {
            response
                .status(500)
                .json({
                    error: 'An Internal Server Error occurred while trying to get the Bitcoin rate.',
                })
        }
    }


    public subscribeEmail = (request : Request, response : Response) => {
        const email : string = request.body.email

        if (!email || !this.emailValidator.isEmailValid(email)) {
            response
                .status(400)
                .json({
                    error: "Invalid format. Please provide the request containing a valid 'email' field.",
                })
            return
        }

        try {
            this.emailService.subscribeEmail(email)
            response.status(200).end()
        } catch (err) {
            response
                .status(500)
                .json({
                    error: 'An Internal Server Error occurred while trying to subscribe the provided email.',
                })
        }
    }

    public sendRateToSubcribers = (request : Request, response : Response) => {
        try {
            this.emailService.sendRateToSubcribers()
            response.status(200).end()
        } catch (err) {
            response
                .status(500)
                .json({
                    error: 'An Internal Server Error occurred while trying to broadcast the Bitcoin rate to subscribers.',
                })
        }
    }
}
