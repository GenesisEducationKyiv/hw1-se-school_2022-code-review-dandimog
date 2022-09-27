import { CoinGeckoClient } from '../../clients/concrete/CoinGeckoClient'
import { BitcoinClientChain } from '../abstract/BitcoinClientChain'

export class CoinGeckoChain extends BitcoinClientChain {
    constructor(binanceClient?: CoinGeckoClient) {
        if (binanceClient !== undefined) {
            super(binanceClient)
        } else {
            super(new CoinGeckoClient())
        }
    }
}
