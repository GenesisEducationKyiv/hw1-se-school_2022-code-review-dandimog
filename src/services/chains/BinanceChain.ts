import { BinanceClient } from "../clients/BinanceClient"
import { CryptoChain } from "./CryptoChain"

export class BinanceChain extends CryptoChain {
    constructor(binanceClient? : BinanceClient) {
        if (binanceClient !== undefined) {
            super(binanceClient)
        } else {
            super(new BinanceClient())
        }
    }
}