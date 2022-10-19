import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpException } from '../../models/erorrs/HttpException'
import { HttpStatus } from '../../models/erorrs/HttpStatus'
import { BitcoinClient } from '../clients/abstract/BitcoinClient'
import { logger } from '../loggers/concrete/FileLogger'

const SECONDS_IN_ONE_MINUTE = 60
const MILISECONDS_IN_ONE_SECOND = 1000
const CACHE_EXPIRATION_LIFETIME_IN_MINS = 5

export class BitcoinCachingProxy extends BitcoinClient {

    private cachedRate?: number
    private lastFetchDate?: Date
    private timeToLiveInMs: number

    constructor(
        private bitcoinClient: BitcoinClient,
        private minutesToLive?: number
    ) {
        super(
            bitcoinClient.NAME,
            bitcoinClient.API_URL, 
            bitcoinClient.API_KEY_NAME, 
            bitcoinClient.API_KEY_VALUE
        )

        if (this.minutesToLive !== undefined) {
            this.timeToLiveInMs =
            this.minutesToLive * SECONDS_IN_ONE_MINUTE * MILISECONDS_IN_ONE_SECOND
        } else {
            this.timeToLiveInMs =
                CACHE_EXPIRATION_LIFETIME_IN_MINS * 
                SECONDS_IN_ONE_MINUTE * 
                MILISECONDS_IN_ONE_SECOND
        }
    }

    private isCachedRateValid(): boolean {
        if (this.lastFetchDate === undefined) return false
        return this.lastFetchDate.getTime() + this.timeToLiveInMs > new Date().getTime()
    }

    public async getBitcoinRate(): Promise<number> {
        try {
            if (
                !this.cachedRate ||
                !this.lastFetchDate ||
                !this.isCachedRateValid()
            ) {
                this.cachedRate = await this.bitcoinClient.getBitcoinRate()
                this.lastFetchDate = new Date()
            } 
            return this.cachedRate
        } catch (err) {
            logger.error(err as string)
            throw new HttpException(
                HttpStatus.BAD_REQUEST, 
                'An error occured while trying to get the Bitcoin rate.'
            )
        }
    }

    public buildAxiosRequest(): AxiosRequestConfig {
        return this.bitcoinClient.buildAxiosRequest()
    }

    public retrieveRateFromResponse(response: AxiosResponse["data"]): number {
        return this.bitcoinClient.retrieveRateFromResponse(response)
    }

}
