export interface IBitcoinClient {
    getBitcoinRate(): Promise<number>
    createBitcoinClient(): IBitcoinClient
}
