import { BitcoinClient } from '../abstract/BitcoinClient'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export class CoinMarketCapClient extends BitcoinClient {

    constructor() {
        super(
            'https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=BTC&convert=UAH',
            'X-CMC_PRO_API_KEY',
            process.env.COIN_MARKET_CAP_API_KEY
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
        return response.data[0].quote.UAH.price
    }

}
