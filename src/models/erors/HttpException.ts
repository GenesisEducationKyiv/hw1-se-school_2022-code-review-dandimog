import { HttpStatus } from "./HttpStatus"

export class HttpException extends Error {
    constructor(public status: HttpStatus, public message: string) {
        super(message)
    }
}