import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { IBitcoinClient } from './IBitcoinClient'

export abstract class BitcoinClient implements IBitcoinClient {
    abstract API_URL: string
    public API_KEY_NAME?: string
    public API_KEY_VALUE?: string
    
    getBitcoinRate(): AxiosResponse["data"] {
            const headers =
                (this.API_KEY_NAME !== undefined && this.API_KEY_VALUE !== undefined) ?
                    ({ headers: { [this.API_KEY_NAME]: this.API_KEY_VALUE } } as AxiosRequestConfig) :
                    undefined
            return axios.get(this.API_URL, headers)
                .then(response => response.data)
                .catch(error => {
                    console.log('An error occurred while trying to get the Bitcoin rate.', error)
                    throw error
                })
    }

    abstract retrieveRateFromResponse(result: AxiosResponse): number
}
