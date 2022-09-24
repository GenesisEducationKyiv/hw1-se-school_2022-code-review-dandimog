import "reflect-metadata"
import { ValidationService } from "../../src/services/ValidationService"

const service: ValidationService = new ValidationService()

describe('Testing the ValidationService.isEmailValid().', () => {
    const failureCases: Map<string, boolean> = new Map<string, boolean>([
        ['', false],
        [' ', false],
        ['robert.martin.gmail.com', false],
        ['robert,martin@g-mail.com', false],
        [' robert@gmail.com', false],
        ['robert.martin@gmail', false],
        ['@gmail.com', false],
        ['robert@gmail,com', false],
    ])

    test('The provided emails should not be valid. Test cases should return false.', () => {
        failureCases.forEach((value: boolean, key: string) =>
            expect(service.isEmailValid(key)).toBe(value)
        )
    })

    const successCases: Map<string, boolean> = new Map<string, boolean>([
        ['robert.martin@gmail.com', true],
        ['robert.martin@g-mail.com', true],
        ['robert@g-mail.com', true],
    ])

    test('The provided emails should be valid. Test cases should return true.', () => {
        successCases.forEach((value: boolean, key: string) =>
            expect(service.isEmailValid(key)).toBe(value)
        )
    })
})
