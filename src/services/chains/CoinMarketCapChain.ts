import { CoinMarketCapClient } from "../clients/CoinMarketCapClient"
import { BitcoinClientChain } from "./BitcoinClientChain"

export class CoinMarketCapChain extends BitcoinClientChain {
    constructor(coinMarketCapClient? : CoinMarketCapClient) {
        if (coinMarketCapClient !== undefined) {
            super(coinMarketCapClient)
        } else {
            super(new CoinMarketCapClient())
        }
    }
}