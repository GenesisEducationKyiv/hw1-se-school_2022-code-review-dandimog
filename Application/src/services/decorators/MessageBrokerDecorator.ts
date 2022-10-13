import { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpException } from "../../models/erorrs/HttpException";
import { HttpStatus } from "../../models/erorrs/HttpStatus";
import { BitcoinClient } from "../clients/abstract/BitcoinClient";
import { IPublisher } from "../publisher/IPublisher";

export class MessageBrokerDecorator extends BitcoinClient {

    constructor(
        private bitcoinClient: BitcoinClient,
        private publisher: IPublisher
    ) {
        super(
            bitcoinClient.NAME,
            bitcoinClient.API_URL, 
            bitcoinClient.API_KEY_NAME, 
            bitcoinClient.API_KEY_VALUE
        )
    }

    public async getAxiosResponseData(): Promise<AxiosResponse["data"]> {
        try {
            const response: AxiosResponse["data"] = await this.bitcoinClient.getAxiosResponseData()
            await this.publisher.publish('Axios_logs', JSON.stringify(response))
            return response
        } catch(err) {
            console.log(err)
            throw new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR, 
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