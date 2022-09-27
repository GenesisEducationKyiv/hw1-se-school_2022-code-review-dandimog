import { AxiosResponse } from "axios";

export interface IBitcoinClient {
    getBitcoinRate(): AxiosResponse["data"]
}
