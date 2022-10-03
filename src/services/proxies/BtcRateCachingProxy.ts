import { AxiosResponse } from 'axios'
import { BitcoinClient } from '../clients/abstract/BitcoinClient'

const SECONDS_IN_ONE_MINUTE = 60
const MILISECONDS_IN_ONE_SECOND = 1000

export class BtcRateCachingProxy extends BitcoinClient {

    private cachedRate?: number
    private lastFetchDate?: Date
    private timeToLiveInMs: number

    public API_URL: string
    public API_KEY_NAME?: string | undefined
    public API_KEY_VALUE?: string | undefined

    constructor(
        private bitcoinClient: BitcoinClient,
        private minutesToLive?: number
    ) {
        super()
        if (minutesToLive !== undefined) {
            this.timeToLiveInMs =
                minutesToLive * SECONDS_IN_ONE_MINUTE * MILISECONDS_IN_ONE_SECOND
        } else {
            this.timeToLiveInMs =
                5 * SECONDS_IN_ONE_MINUTE * MILISECONDS_IN_ONE_SECOND
        }

        this.API_URL = bitcoinClient.API_URL
        this.API_KEY_NAME = bitcoinClient.API_KEY_NAME
        this.API_KEY_VALUE = bitcoinClient.API_KEY_VALUE
    }

    private isCachedRateValid(): boolean {
        if (this.lastFetchDate == undefined) return false
        return this.lastFetchDate.getTime() + this.timeToLiveInMs > new Date().getTime()
    }

    getBitcoinRate(): number {
        try {
            if (
                !this.cachedRate ||
                !this.lastFetchDate ||
                !this.isCachedRateValid()
            ) {
                this.cachedRate = this.bitcoinClient.getBitcoinRate()
                this.lastFetchDate = new Date()
                return this.cachedRate!
            } else {
                return this.cachedRate
            }
        } catch (err) {
            console.log('An error occured while trying to get the Bitcoin rate.', err)
            throw err
        }
    }
    
    retrieveRateFromResponse(result: AxiosResponse["data"]): number {
        return this.bitcoinClient.retrieveRateFromResponse(result)
    }
}
