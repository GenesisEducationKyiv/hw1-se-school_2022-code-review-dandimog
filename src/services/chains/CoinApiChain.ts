import { CoinApiClient } from "../clients/CoinApiClient"
import { CryptoChain } from "./CryptoChain"

export class CoinApiChain extends CryptoChain {
    constructor(coinApiClient? : CoinApiClient) {
        if (coinApiClient !== undefined) {
            super(coinApiClient)
        } else {
            super(new CoinApiClient())
        }
    }
}