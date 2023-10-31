import { StandardErrorHandler } from '../responses/standard.error.response'
export default class GeneralError extends Error {
    code: string
    traceId: string | null | undefined
    field: string | null | undefined
    status: number | null | undefined
    isCustomError: boolean

    constructor(standardErrorHandler: StandardErrorHandler) {
        super(standardErrorHandler.description)

        if (standardErrorHandler.code) {
            this.code = standardErrorHandler.code
        } else {
            this.code = '' + standardErrorHandler.status
        }

        this.traceId = standardErrorHandler.traceId
        this.field = standardErrorHandler.field
        this.status = standardErrorHandler.status
        this.isCustomError = true
    }
}
