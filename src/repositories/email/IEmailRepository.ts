export interface IEmailRepository {
    databasePath: string

    saveEmail(email: string): void
    getAllEmails(): Array<string>
}
