import { IEmailRepository } from './IEmailRepository'
import fs from 'fs'
import { HttpException } from '../../models/erorrs/HttpException'
import { HttpStatus } from '../../models/erorrs/HttpStatus'
export class EmailRepository implements IEmailRepository {
    public databasePath: string

    constructor() {
        this.databasePath =
            process.env.DATABASE_URL ?? 'src/resources/database.json'
    }

    public saveEmail(email: string): void {
        const database: Array<string> = this.getAllEmails()
        if (database.includes(email)) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                'The provided email already exists.'
            )
        }
        database.push(email)
        const jsonWrapper = { emails: database }
        const jsonDatabase: string = JSON.stringify(jsonWrapper, null, 2)
        fs.writeFileSync(this.databasePath, jsonDatabase)
    }

    public getAllEmails(): Array<string> {
        const data: Buffer = fs.readFileSync(this.databasePath)
        const json = JSON.parse(data.toString())
        return json.emails
    }
}
