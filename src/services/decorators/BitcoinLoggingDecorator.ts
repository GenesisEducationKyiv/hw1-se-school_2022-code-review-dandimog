import { BitcoinClient } from "../clients/abstract/BitcoinClient"
import fs from "fs"
import { config } from "../../../config"
import { HttpException } from "../../models/erorrs/HttpException"
import { HttpStatus } from "../../models/erorrs/HttpStatus"
import { AxiosRequestConfig, AxiosResponse } from "axios"

export class BitcoinLoggingDecorator extends BitcoinClient {
    
    constructor(private bitcoinClient: BitcoinClient) {
        super(
            bitcoinClient.NAME,
            bitcoinClient.API_URL, 
            bitcoinClient.API_KEY_NAME, 
            bitcoinClient.API_KEY_VALUE
        )
    }

    public async getAxiosResponseData(): Promise<AxiosResponse["data"]> {
        try {
            const response = await this.bitcoinClient.getAxiosResponseData()
            fs.appendFileSync(
                config.logger.destination, 
                `Response from ${this.bitcoinClient.NAME}: ${JSON.stringify(response)} \n`
            )
            return response
        } catch(err) {
            console.log(err)
            throw new HttpException(
                HttpStatus.BAD_REQUEST, 
                'An error occured while trying to get th Bitcoin rate.'
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