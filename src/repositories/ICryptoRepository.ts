export interface ICryptoRepository {
    saveEmail(email : string) : void;
    getAllEmails() : Array<string>;
}