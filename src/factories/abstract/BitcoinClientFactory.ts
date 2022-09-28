import { BtcClientEnum } from '../../../config'
import { BitcoinClient } from '../../services/clients/abstract/BitcoinClient'

export abstract class BitcoinClientFactory {
    public static btcFactories: Map<BtcClientEnum, BitcoinClientFactory> = new Map<BtcClientEnum, BitcoinClientFactory>()

    public static registerFactory(clientName: BtcClientEnum, bitcoinClientFactory: BitcoinClientFactory): void {
        BitcoinClientFactory.btcFactories.set(clientName, bitcoinClientFactory)
    }

    public static getClient(clientName: BtcClientEnum): BitcoinClient {
        const client: BitcoinClient | undefined = 
            BitcoinClientFactory.btcFactories.get(clientName)?.createBitcoinClient()
        if (client) {
            return client
        } else {
            throw new Error('Cannot find the corresponding factory to create the instance of provided BTC client.')
        }
    }

    public abstract createBitcoinClient(): BitcoinClient
}
