import { BitcoinClient } from "../clients/BitcoinClient"
import { Chainable } from "../chains/Chainable"

export abstract class CryptoChain extends BitcoinClient implements Chainable {

    protected nextChain?: CryptoChain
    protected bitcoinClient: BitcoinClient
    API_URL : string

    constructor(bitcoinClient: BitcoinClient) {
        super()
        this.bitcoinClient = bitcoinClient
        this.API_URL = bitcoinClient.API_URL
    }

    setNext(nextChain: CryptoChain): CryptoChain {
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
                throw new Error('Some error')
            }
        }
    }
}