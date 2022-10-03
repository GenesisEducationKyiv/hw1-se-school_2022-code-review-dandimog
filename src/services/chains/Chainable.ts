export interface Chainable {
    setNext(next: Chainable): Chainable
}
