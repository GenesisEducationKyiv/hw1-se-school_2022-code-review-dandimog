import { CryptoRepository } from '../../src/repositories/CryptoRepository'
import { ICryptoRepository } from '../../src/repositories/ICryptoRepository'
import fs from 'fs'

const repo: ICryptoRepository = new CryptoRepository()

function clearAll(): void {
    try {
        const jsonWrapper = { emails: new Array<string>() }
        const jsonDatabase: string = JSON.stringify(jsonWrapper, null, 2)
        fs.writeFileSync(repo.databasePath, jsonDatabase)
    } catch (err) {
        console.log(
            'An error occurred while trying to clear all records in the database.',
            err
        )
        throw err
    }
}

beforeEach(() => {
    clearAll()
})

describe('Testing the CryptoRepository.', () => {
    test('Check whether the saveEmail() saves the provided emails properly. Collections of saved and retrieved emails should be identical.', () => {
        repo.saveEmail('test.email@gmail.com')
        repo.saveEmail('mock.email@gmail.com')
        expect(repo.getAllEmails()).toEqual(
            new Array<string>('test.email@gmail.com', 'mock.email@gmail.com')
        )
    })

    test('Check whether the saveEmail() handles the duplicates properly. The operation of saving the same email should be idempotent.', () => {
        repo.saveEmail('test.email@gmail.com')
        repo.saveEmail('test.email@gmail.com')
        expect(repo.getAllEmails()).toStrictEqual(
            new Array<string>('test.email@gmail.com')
        )
    })

    test('Check whether the clearAll() function clears the database as expected. After calling clearAll() method there should be no emails left.', () => {
        repo.saveEmail('test.email@gmail.com')
        repo.saveEmail('mock.email@gmail.com')
        clearAll()
        expect(repo.getAllEmails()).toStrictEqual(new Array<string>())
    })
})
