import { BtcClientEnum } from '../../models/enums/BtcClientEnum'
import { BitcoinClientFactory } from './BitcoinClientFactory'

export class FactoryRegistrator {
    public static btcFactories: Map<BtcClientEnum, BitcoinClientFactory> = new Map<BtcClientEnum, BitcoinClientFactory>()

    public static registerFactory(clientName: BtcClientEnum, bitcoinClientFactory: BitcoinClientFactory): void {
        FactoryRegistrator.btcFactories.set(clientName, bitcoinClientFactory)
    }
}