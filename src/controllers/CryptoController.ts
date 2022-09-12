import { ValidationService } from "../services/ValidationService"
import { Request, Response } from 'express'
import { IBitcoinClient } from "../services/clients/IBitcoinClient"
import { IEmailService } from "../services/IEmailService"
import { injectable, inject } from "inversify-props"
import { Locator } from "../../config"
import { ICryptoController } from "./ICryptoController"

@injectable()
export class CryptoController implements ICryptoController{

    constructor(
        @inject(Locator.BitcoinClient) private bitcoinClient: IBitcoinClient, 
        @inject(Locator.IEmailService) private emailService: IEmailService, 
        @inject(Locator.ValidationService) private emailValidator: ValidationService
    ) {}

    public getBitcoinRate = async (request : Request, response : Response) => {
        try {
            const result : number = await this.bitcoinClient.getBitcoinRate()
            console.log(result)
            response.status(200).json({ bitcoinRate : result.toString() + ' UAH' })
        } catch (err) {
            response.status(500).json({ error : 'An Internal Server Error occurred while trying to get the Bitcoin rate.' })
        }
    }

    public subscribeEmail = (request : Request, response : Response) => {
        const email : string = request.body.email

        if (!email || !this.emailValidator.isEmailValid(email)) {
            response.status(400).json({ error: 'Invalid format. Please provide the request containing a valid \'email\' field.' })
            return
        }
        
        try {
            this.emailService.subscribeEmail(email)
            response.status(200).end()
        } catch (err) {
            response.status(500).json({ error : 'An Internal Server Error occurred while trying to subscribe the provided email.' })
        }
    }

    public sendRateToSubcribers = (request : Request, response : Response) => {
        try {
            this.emailService.sendRateToSubcribers()
            response.status(200).end()
        } catch (err) {
            response.status(500).json({ error : 'An Internal Server Error occurred while trying to broadcast the Bitcoin rate to subscribers.' })
        }
    }
    
}