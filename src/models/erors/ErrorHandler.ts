import { HttpException } from "./HttpException";
import { Response } from 'express'
import { HttpStatus } from "./HttpStatus";
import { config } from "../../../config";

export class ErrorHandler {
    public handlerError(error: unknown, response: Response): void {
        if (error && error instanceof Error) {
            if (error instanceof HttpException) {
                response
                    .status(error.status)
                    .header("Content-Type", config.app.response_content_type)
                    .send({ error: error.message })
            } else {
                response
                    .header("Content-Type", config.app.response_content_type)
                    .send({ error: error.message })
            }
        } else {
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header("Content-Type", config.app.response_content_type)
                .send({ error: 'An Internal Server Error occurred.' })
        }
    }
}