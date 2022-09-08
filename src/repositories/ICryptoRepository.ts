export interface ICryptoRepository {
    databasePath: string

    saveEmail(email : string) : void
    getAllEmails() : Array<string>
    clearAll() : void
}