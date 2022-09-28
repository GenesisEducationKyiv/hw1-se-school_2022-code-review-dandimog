import { CoinApiClient } from "../clients/CoinApiClient"
import { BitcoinClientChain } from "./BitcoinClientChain"

export class CoinApiChain extends BitcoinClientChain {
    constructor(coinApiClient? : CoinApiClient) {
        if (coinApiClient !== undefined) {
            super(coinApiClient)
        } else {
            super(new CoinApiClient())
        }
    }
}