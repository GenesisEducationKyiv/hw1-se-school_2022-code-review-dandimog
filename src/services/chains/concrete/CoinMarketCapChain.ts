import { CoinMarketCapClient } from '../../clients/concrete/CoinMarketCapClient'
import { BitcoinClientChain } from '../abstract/BitcoinClientChain'

export class CoinMarketCapChain extends BitcoinClientChain {
    constructor(coinMarketCapClient?: CoinMarketCapClient) {
        if (coinMarketCapClient !== undefined) {
            super(coinMarketCapClient)
        } else {
            super(new CoinMarketCapClient())
        }
    }
}
