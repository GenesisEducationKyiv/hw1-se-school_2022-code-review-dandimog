import { ValidationService } from '../services/validation/ValidationService'
import { Request, Response } from 'express'
import { BitcoinClient } from '../services/clients/abstract/BitcoinClient'
import { IEmailService } from '../services/email/IEmailService'
import { ICryptoController } from './ICryptoController'
import { ErrorHandler } from '../models/erors/ErrorHandler'
import { HttpException } from '../models/erors/HttpException'
import { HttpStatus } from '../models/erors/HttpStatus'
import { config } from '../../config'

export class CryptoController implements ICryptoController {
    constructor(
        public bitcoinClient: BitcoinClient,
        public emailService: IEmailService,
        public emailValidator: ValidationService,
        public errorHandler: ErrorHandler
    ) {}

    public getBitcoinRate = async (request: Request, response: Response) => {
        try {
            const rate: number = await this.bitcoinClient.getBitcoinRate()
            console.log(rate)
            response
                .status(HttpStatus.OK)
                .header("Content-Type", config.app.response_content_type)
                .send({ bitcoinRate: rate.toString() + ' UAH' })
        } catch (err: unknown) {
            console.log(err)
            this.errorHandler.handlerError(err, response)
        }
    }

    public subscribeEmail = (request: Request, response: Response) => {
        const email: string = request.body.email

        if (!email || !this.emailValidator.isEmailValid(email)) {
            const err: HttpException = 
                new HttpException(HttpStatus.BAD_REQUEST, "Invalid format. Please provide the request containing a valid 'email' field.")
            this.errorHandler.handlerError(err, response)
            return
        }

        try {
            this.emailService.subscribeEmail(email)
            response.status(HttpStatus.OK).end()
        } catch (err: unknown) {
            console.log(err)
            this.errorHandler.handlerError(err, response)
        }
    }

    public sendRateToSubcribers = async (request: Request, response: Response) => {
        try {
            const bitcoinRate: number = await this.bitcoinClient.getBitcoinRate()
            const emails: Array<string> = this.emailService.getAllEmails()
            this.emailService.sendRateToSubcribers(bitcoinRate, emails)
            response.status(HttpStatus.OK).end()
        } catch (err: unknown) {
            console.log(err)
            this.errorHandler.handlerError(err, response)
        }
    }
}
