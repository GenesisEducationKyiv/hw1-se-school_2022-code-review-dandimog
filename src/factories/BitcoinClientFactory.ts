import { BitcoinClient } from "../services/clients/BitcoinClient"

export class BitcoinClientFactory {

    private static clients: Map<string, BitcoinClient> = new Map<string, BitcoinClient>()

    public static registerClient(clientName: string, clientClass: BitcoinClient) : void {
		BitcoinClientFactory.clients.set(clientName, clientClass)
	}

    public static createBitcoinClient(name: string): BitcoinClient {
        const clientClass: BitcoinClient | undefined = BitcoinClientFactory.clients.get(name)
        if (clientClass !== undefined) {
            return clientClass.createBitcoinClient()
        } else{ 
            throw new Error(`An error occured while trying to create the ${name} Bitcoin client.`)
        }
    }
}