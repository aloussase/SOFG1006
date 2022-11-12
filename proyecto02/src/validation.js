export class UnsatisfiedPreconditionException extends Error {
    constructor(msg = "") {
        super(`UnsatisfiedPreconditionException: Precondition was not met: ${msg}`);
    }
}


export function require(boolean, msg) {
    if (!boolean) {
        throw new UnsatisfiedPreconditionException(msg);
    }
}