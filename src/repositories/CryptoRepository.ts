import { ICryptoRepository } from "./ICryptoRepository";
import fs from 'fs';
import { Service } from "typedi";

@Service()
export class CryptoRepository implements ICryptoRepository {

    static readonly databasePath: string = "src/resources/database.json";

    public saveEmail(email : string) : void {
        const database : Array<string> = this.getAllEmails();
        database.push(email);
        const jsonWrapper = { "emails" : database }
        const jsonDatabase : string = JSON.stringify(jsonWrapper, null, 2)
        fs.writeFileSync(CryptoRepository.databasePath, jsonDatabase)
    }

    public getAllEmails() : Array<string> {
        const data : Buffer = fs.readFileSync(CryptoRepository.databasePath);
        const json = JSON.parse(data.toString());
        console.log(json);
        return json.emails;
    }
    
}
