import { HttpException } from '../../../models/erors/HttpException'
import { HttpStatus } from '../../../models/erors/HttpStatus'
import { Chainable } from '../../chains/Chainable'
import { IBitcoinClient } from './IBitcoinClient'

export abstract class BitcoinClient implements IBitcoinClient, Chainable {

    private next?: BitcoinClient

    constructor(
        protected API_URL: string,
        protected API_KEY_NAME?: string,
        protected API_KEY_VALUE?: string
    ) {}
    
    public async getBitcoinRate(): Promise<number> {

        if (this.next) {
            return this.next.getBitcoinRate()
        }

        throw new HttpException(
            HttpStatus.NOT_FOUND, 
            'No Bitcoin provider which could handle your request was found.'
        )

    }

    public setNext(next: BitcoinClient): Chainable {
        this.next = next
        return next
    }
    
}
