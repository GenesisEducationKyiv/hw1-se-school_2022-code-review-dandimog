import { ICryptoRepository } from "./ICryptoRepository";
import fs from 'fs';
import { Service } from "typedi";

@Service()
export class CryptoRepository implements ICryptoRepository {

    databasePath: string = "src/resources/database.json";

    public saveEmail(email : string) : void {
        const database : Array<string> = this.getAllEmails();
        if (database.includes(email)) return
        database.push(email)
        const jsonWrapper = { "emails" : database }
        const jsonDatabase : string = JSON.stringify(jsonWrapper, null, 2)
        fs.writeFileSync(this.databasePath, jsonDatabase)
    }

    public getAllEmails() : Array<string> {
        const data : Buffer = fs.readFileSync(this.databasePath);
        const json = JSON.parse(data.toString());
        return json.emails;
    }
    
    public clearAll() : void {
        const jsonWrapper = { "emails" : new Array<string> }
        const jsonDatabase : string = JSON.stringify(jsonWrapper, null, 2)
        fs.writeFileSync(this.databasePath, jsonDatabase)
    }
}
