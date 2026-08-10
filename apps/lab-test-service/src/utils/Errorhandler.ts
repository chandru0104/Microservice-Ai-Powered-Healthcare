
export class ErrorHaddler extends Error {

    statusCode: number
    success: boolean

    constructor(message: string, statusCode: number, success: boolean) {
        super(message)


        this.statusCode = statusCode
        this.success = success
    }
}


export class ValidationError extends ErrorHaddler {

    constructor(message: string) {
        super(message, 400, false)
    }
}