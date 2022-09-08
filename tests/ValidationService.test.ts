import { ValidationService } from "../src/services/ValidationService"

const service : ValidationService = new ValidationService()

describe('Testing the ValidationService.', () => {
    
    test('Check whether the email validation rule works as expected.', () => {
        expect(service.isEmailValid('')).toBeFalsy()
        expect(service.isEmailValid(' ')).toBeFalsy()
        expect(service.isEmailValid('robert.martin@gmail.com')).toBeTruthy()
        expect(service.isEmailValid('robert.martin.gmail.com')).toBeFalsy()
        expect(service.isEmailValid('robert.martin@g-mail.com')).toBeTruthy()
        expect(service.isEmailValid('robert,martin@g-mail.com')).toBeFalsy()
        expect(service.isEmailValid(' robert@gmail.com')).toBeFalsy()
        expect(service.isEmailValid('robert.martin@gmail')).toBeFalsy()
        expect(service.isEmailValid('@gmail.com')).toBeFalsy()
        expect(service.isEmailValid('robert@gmail,com')).toBeFalsy()
        expect(service.isEmailValid('robert@g-mail.com')).toBeTruthy()
    })

})