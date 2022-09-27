import { AxiosResponse } from 'axios'
import { BitcoinClient } from '../../clients/abstract/BitcoinClient'
import { Chainable } from './Chainable'

export class BitcoinClientChain extends BitcoinClient implements Chainable {

    protected nextChain?: BitcoinClientChain
    protected bitcoinClient: BitcoinClient
    API_URL: string

    constructor(bitcoinClient: BitcoinClient) {
        super()
        this.bitcoinClient = bitcoinClient
        this.API_URL = bitcoinClient.API_URL
    }

    setNext(nextChain: BitcoinClientChain): BitcoinClientChain {
        this.nextChain = nextChain
        return nextChain
    }

    getBitcoinRate(): Promise<number> {
        try {
            return this.bitcoinClient.getBitcoinRate()
        } catch (err) {
            if (this.nextChain) {
                return this.nextChain.getBitcoinRate()
            } else {
                console.log(
                    'An error occured while trying to get the Bitcoin rate.',
                    err
                )
                throw err
            }
        }
    }

    retrieveRateFromResponse(result: AxiosResponse["data"]): number {
        return this.bitcoinClient.retrieveRateFromResponse(result)
    }
}
