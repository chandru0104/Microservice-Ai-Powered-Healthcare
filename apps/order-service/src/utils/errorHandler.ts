export class errorHandler extends Error {

    statusCode: number
    success: boolean

    constructor(statusCode: number, success: boolean, message: string) {
        super(message)

        this.statusCode = statusCode
        this.success = success
    }
}



export class validationError extends errorHandler {

    constructor(message: string) {
        super(400, false, message)
    }

}