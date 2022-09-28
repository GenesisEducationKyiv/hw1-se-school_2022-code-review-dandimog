import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { IBitcoinClient } from './IBitcoinClient'

export abstract class BitcoinClient implements IBitcoinClient {
    abstract API_URL: string
    public API_KEY_NAME?: string
    public API_KEY_VALUE?: string

    public async getBitcoinResponse(): Promise<AxiosResponse["data"]> {
        const headers =
            (this.API_KEY_NAME !== undefined && this.API_KEY_VALUE !== undefined) ?
                ({ headers: { [this.API_KEY_NAME]: this.API_KEY_VALUE } } as AxiosRequestConfig) :
                undefined
        try {
            return await axios.get(this.API_URL, headers)
        } catch (err) {
            console.log('An error occurred while trying to get the Bitcoin rate.', err)
            throw err
        }
    }
    
    public getBitcoinRate(): number {
        return 111000
    }

    public abstract retrieveRateFromResponse(result: AxiosResponse["data"]): number
}
