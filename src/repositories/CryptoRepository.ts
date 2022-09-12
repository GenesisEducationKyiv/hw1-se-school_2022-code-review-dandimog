import { ICryptoRepository } from "./ICryptoRepository"
import fs from 'fs'
import { injectable } from "inversify-props"

@injectable()
export class CryptoRepository implements ICryptoRepository {

    databasePath = "src/resources/database.json"

    public saveEmail(email : string) : void {
        try {
            const database : Array<string> = this.getAllEmails()
            if (database.includes(email)) return
            database.push(email)
            const jsonWrapper = { "emails" : database }
            const jsonDatabase : string = JSON.stringify(jsonWrapper, null, 2)
            fs.writeFileSync(this.databasePath, jsonDatabase)
        } catch (err) {
            console.log('An error occurred while trying to save the provided email to the database.', err)
            throw err
        }
    }

    public getAllEmails() : Array<string> {
        try {
            const data : Buffer = fs.readFileSync(this.databasePath)
            const json = JSON.parse(data.toString())
            return json.emails
        } catch (err) {
            console.log('An error occurred while trying to get all the emails from the database.', err)
            throw err
        }
    }
    
    public clearAll() : void {
        try {
            const jsonWrapper = { "emails" : new Array<string> }
            const jsonDatabase : string = JSON.stringify(jsonWrapper, null, 2)
            fs.writeFileSync(this.databasePath, jsonDatabase)
        } catch (err) {
            console.log('An error occurred while trying to clear all records in the database.', err)
            throw err
        }
    }
}
