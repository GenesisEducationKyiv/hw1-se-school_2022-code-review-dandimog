import { BtcClientEnum } from '../../models/BtcClientEnum'
import { BitcoinClient } from '../../services/clients/abstract/BitcoinClient'
import { FactoryRegistrator } from './FactoryRegistrator'

export abstract class BitcoinClientFactory {
    public abstract createBitcoinClient(): BitcoinClient

    public static getClient(clientName: BtcClientEnum): BitcoinClient {
        const client: BitcoinClient | undefined = 
        FactoryRegistrator.btcFactories.get(clientName)?.createBitcoinClient()
        if (client) {
            return client
        } else {
            throw new Error('Cannot find the corresponding factory to create the instance of provided BTC client.')
        }
    }
}
