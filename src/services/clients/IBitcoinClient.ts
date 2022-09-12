export interface IBitcoinClient {
    getBitcoinRate(): Promise<number>
}