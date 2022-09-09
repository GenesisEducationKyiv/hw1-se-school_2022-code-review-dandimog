export interface IBitcoinService {
    getBitcoinRate(): Promise<number>
}