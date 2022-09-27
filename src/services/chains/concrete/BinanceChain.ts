import { BinanceClient } from '../../clients/concrete/BinanceClient'
import { BitcoinClientChain } from '../abstract/BitcoinClientChain'

export class BinanceChain extends BitcoinClientChain {
    constructor(binanceClient?: BinanceClient) {
        if (binanceClient !== undefined) {
            super(binanceClient)
        } else {
            super(new BinanceClient())
        }
    }
}
