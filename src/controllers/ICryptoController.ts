import { Request, Response } from 'express'

export interface ICryptoController {
    getBitcoinRate(request : Request, response : Response): void
    subscribeEmail(request : Request, response : Response) : void
    sendRateToSubcribers(request : Request, response : Response) : void
}