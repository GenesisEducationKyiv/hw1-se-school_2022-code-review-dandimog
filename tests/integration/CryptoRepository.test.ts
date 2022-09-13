import { CryptoRepository } from '../../src/repositories/CryptoRepository'
import { ICryptoRepository } from '../../src/repositories/ICryptoRepository'

const repo: ICryptoRepository = new CryptoRepository()
repo.databasePath = 'tests/resources/mockDatabase.json'

beforeEach(() => {
    repo.clearAll()
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
        repo.clearAll()
        expect(repo.getAllEmails()).toStrictEqual(new Array<string>())
    })
})
