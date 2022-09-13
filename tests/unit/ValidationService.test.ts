import { ValidationService } from '../../src/services/ValidationService'

const service: ValidationService = new ValidationService()

describe('Testing the ValidationService.isEmailValid().', () => {
    test('The provided emails should not be valid. Test cases should return false.', () => {
        expect(service.isEmailValid('')).toBe(false)
        expect(service.isEmailValid(' ')).toBe(false)
        expect(service.isEmailValid('robert.martin.gmail.com')).toBe(false)
        expect(service.isEmailValid('robert,martin@g-mail.com')).toBe(false)
        expect(service.isEmailValid(' robert@gmail.com')).toBe(false)
        expect(service.isEmailValid('robert.martin@gmail')).toBe(false)
        expect(service.isEmailValid('@gmail.com')).toBe(false)
        expect(service.isEmailValid('robert@gmail,com')).toBe(false)
    })

    test('The provided emails should be valid. Test cases should return true.', () => {
        expect(service.isEmailValid('robert.martin@gmail.com')).toBe(true)
        expect(service.isEmailValid('robert.martin@g-mail.com')).toBe(true)
        expect(service.isEmailValid('robert@g-mail.com')).toBe(true)
    })
})
