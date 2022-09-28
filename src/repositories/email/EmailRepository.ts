import { IEmailRepository } from './IEmailRepository'
import fs from 'fs'
import { HttpException } from '../../models/erors/HttpException'
import { HttpStatus } from '../../models/erors/HttpStatus'
export class EmailRepository implements IEmailRepository {
    databasePath: string

    constructor() {
        this.databasePath =
            process.env.DATABASE_URL ?? 'src/resources/database.json'
    }

    public saveEmail(email: string): void {
        try {
            const database: Array<string> = this.getAllEmails()
            if (database.includes(email)) {
                throw new HttpException(HttpStatus.CONFLICT, 'The provided email already exists.')
            }
            database.push(email)
            const jsonWrapper = { emails: database }
            const jsonDatabase: string = JSON.stringify(jsonWrapper, null, 2)
            fs.writeFileSync(this.databasePath, jsonDatabase)
        } catch (err) {
            console.log('An error occurred while trying to save the provided email to the database.', err)
            throw err
        }
    }

    public getAllEmails(): Array<string> {
        try {
            const data: Buffer = fs.readFileSync(this.databasePath)
            const json = JSON.parse(data.toString())
            return json.emails
        } catch (err) {
            console.log('An error occurred while trying to get all the emails from the database.', err)
            throw err
        }
    }
}
