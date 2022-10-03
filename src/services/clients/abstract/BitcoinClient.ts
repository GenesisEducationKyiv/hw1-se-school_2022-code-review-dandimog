import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BtcClientEnum } from '../../../models/BtcClientEnum'
import { HttpException } from '../../../models/erorrs/HttpException'
import { HttpStatus } from '../../../models/erorrs/HttpStatus'
import { Chainable } from '../../chains/Chainable'
import { IBitcoinClient } from './IBitcoinClient'

export abstract class BitcoinClient implements IBitcoinClient, Chainable {

    private next?: BitcoinClient

    constructor(
        public NAME: BtcClientEnum,
        public API_URL: string,
        public API_KEY_NAME?: string,
        public API_KEY_VALUE?: string
    ) {}
    
    private async getBitcoinRateNext(): Promise<number> {

        if (this.next) {
            return this.next.getBitcoinRate()
        }

        throw new HttpException(
            HttpStatus.NOT_FOUND, 
            'No Bitcoin provider which could handle your request was found.'
        )

    }

    public async getBitcoinRate(): Promise<number> {
        try {
            return this.retrieveRateFromResponse(await this.getAxiosResponseData())
        } catch(err) {
            console.log(err)
            return this.getBitcoinRateNext()
        }
    }

    public async getAxiosResponseData(): Promise<AxiosResponse["data"]> {
        return (await axios.get(this.API_URL, this.buildAxiosRequest())).data
    }

    public setNext(next: BitcoinClient): Chainable {
        this.next = next
        return next
    }
    
    abstract buildAxiosRequest(): AxiosRequestConfig

    abstract retrieveRateFromResponse(response: AxiosResponse["data"]): number
    
}
