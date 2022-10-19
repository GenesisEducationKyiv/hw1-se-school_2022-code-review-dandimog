import { logger } from "../../services/loggers/concrete/FileLogger";
import { Observer } from "./Observer";

export abstract class Observable {

    public observers: Array<Observer> = new Array<Observer>

    public subscribe(observer: Observer): void {
        this.observers.push(observer)
    }

    public unsubscribe(observer: Observer): void {
        const index = this.observers.indexOf(observer, 0);
        this.observers.splice(index, 1);
    }

    public notifyAll(message: string): void {
        this.observers.forEach(async observer => {
            try {
                await observer.update(message)
            } catch(err) {
                this.unsubscribe(observer)
                logger.error(err as string)
                console.log(err)
            }
        })
    }

}