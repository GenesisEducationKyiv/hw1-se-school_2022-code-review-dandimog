import { CoinGeckoClient } from "../clients/CoinGeckoClient"
import { BitcoinClientChain } from "./BitcoinClientChain"

export class CoinGeckoChain extends BitcoinClientChain {
    constructor(binanceClient? : CoinGeckoClient) {
        if (binanceClient !== undefined) {
            super(binanceClient)
        } else {
            super(new CoinGeckoClient())
        }
    }
}