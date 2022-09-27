import { CoinApiClient } from '../../clients/concrete/CoinApiClient'
import { BitcoinClientChain } from '../abstract/BitcoinClientChain'

export class CoinApiChain extends BitcoinClientChain {
    constructor(coinApiClient?: CoinApiClient) {
        if (coinApiClient !== undefined) {
            super(coinApiClient)
        } else {
            super(new CoinApiClient())
        }
    }
}
