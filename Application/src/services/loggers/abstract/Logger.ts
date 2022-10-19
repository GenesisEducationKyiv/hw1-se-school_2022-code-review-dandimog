import { config } from "../../../../config"
import { LogLevel } from "../../../models/enums/LogLevel"
import { Observable } from "../../../models/observer/Observable"
import { ILogger } from "./ILogger"

export abstract class Logger extends Observable implements ILogger {

    private logLevel: LogLevel

    constructor() {
        super()
        this.logLevel = config.logger.level
    }

    public debug(message: string): void {
        if (this.logLevel <= 1000) {
            this.log(`[DEBUG]: ${message}`)
        }
    }

    public info(message: string): void {
        if (this.logLevel <= 2000) {
            this.log(`[INFO]: ${message}`)
        }
    }

    public warn(message: string): void {
        if (this.logLevel <= 3000) {
            this.log(`[WARN]: ${message}`)
        }
    }

    public error(message: string): void {
        if (this.logLevel <= 4000) {
            this.log(`[ERROR]: ${message}`)
        }
    }

    protected log(message: string): void {
        this.notifyAll(message)
    }

}
