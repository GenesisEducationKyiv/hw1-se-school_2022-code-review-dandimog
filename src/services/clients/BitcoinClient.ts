import axios, { AxiosResponse, AxiosRequestConfig } from "axios"
import { IBitcoinClient } from "./IBitcoinClient"

export abstract class BitcoinClient implements IBitcoinClient {

    abstract API_URL: string
    public API_KEY_NAME?: string
    public API_KEY_VALUE?: string

    abstract createBitcoinClient(): BitcoinClient

    async getBitcoinRate(): Promise<number> {
        try {
            const headers = (this.API_KEY_NAME !== undefined && this.API_KEY_VALUE !== undefined) ? { headers: { [this.API_KEY_NAME] : this.API_KEY_VALUE } } as AxiosRequestConfig : undefined
            const result : AxiosResponse = await axios.get(this.API_URL, headers) 
            return this.retrieveRateFromResponse(result)
        } catch (err) {
            console.log('An error occurred while trying to get the Bitcoin rate.', err)
            throw err
        }
    }

    abstract retrieveRateFromResponse(result: AxiosResponse): number
}