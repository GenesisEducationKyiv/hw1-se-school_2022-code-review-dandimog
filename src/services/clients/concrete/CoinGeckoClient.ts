import { BitcoinClient } from '../abstract/BitcoinClient'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export class CoinGeckoClient extends BitcoinClient {

    constructor() {
        super(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah'
        )
    }

    public async getBitcoinRate(): Promise<number> {
        try {
            return this.retrieveRateFromResponse(await this.getAxiosResponseData())
        } catch(err) {
            console.log(err)
            return super.getBitcoinRate()
        }
    }

    private async getAxiosResponseData(): Promise<AxiosResponse["data"]> {
        return (await axios.get(this.API_URL, this.buildAxiosRequest())).data
    }

    private buildAxiosRequest(): AxiosRequestConfig {
        const headers =
            (this.API_KEY_NAME !== undefined && this.API_KEY_VALUE !== undefined) ?
                ({ headers: { [this.API_KEY_NAME]: this.API_KEY_VALUE } }) :
                undefined
        return headers as AxiosRequestConfig
    }

    private retrieveRateFromResponse(response: AxiosResponse["data"]): number {
        return response.bitcoin.uah
    }

}
