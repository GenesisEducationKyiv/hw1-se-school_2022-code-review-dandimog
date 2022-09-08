import { CryptoRepository } from "../src/repositories/CryptoRepository"
import { ICryptoRepository } from "../src/repositories/ICryptoRepository"

const repo: ICryptoRepository = new CryptoRepository()
repo.databasePath = "tests/resources/database.json"

beforeEach(() => { repo.clearAll() })

// TODO: mock the file database / repository in order to reduce the operations with disk (writes & reads)

describe('Testing the CryptoRepository.', () => {
    
    test('Check whether the saveEmail() saves the provided emails properly.', () => {
        repo.saveEmail('test.email@gmail.com')
        repo.saveEmail('mock.email@gmail.com')
        expect(repo.getAllEmails()).toEqual(new Array<string>('test.email@gmail.com', 'mock.email@gmail.com'))
    })

    test('Check whether the saveEmail() handles the duplicates properly.', () => {
        repo.saveEmail('test.email@gmail.com')
        repo.saveEmail('test.email@gmail.com')
        expect(repo.getAllEmails()).toStrictEqual(new Array<string>('test.email@gmail.com'))
    })

    test('Check whether the clearAll() function clears the database as expected.', () => {
        repo.saveEmail('test.email@gmail.com')
        repo.saveEmail('mock.email@gmail.com')
        repo.clearAll()
        expect(repo.getAllEmails()).toStrictEqual(new Array<string>())
    })

})