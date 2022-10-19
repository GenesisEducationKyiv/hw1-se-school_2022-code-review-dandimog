import { Logger } from "../abstract/Logger"
import fs from "fs"
import { config } from "../../../../config"

class FileLogger extends Logger {
    
    constructor(private path: string) {
        super()
    }

    protected log(message: string): void {
        super.log(message)
        fs.appendFileSync(this.path, `${message} \n`)
    }

}

export const logger: FileLogger = new FileLogger(config.logger.path)
