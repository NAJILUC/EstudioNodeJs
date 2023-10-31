type strOrNot = string | null | undefined;
type StrOrUn = string | undefined;
type numberOrNot = number | null | undefined;

export interface StandardError {
    code: string
    description: string
    traceId?: strOrNot
    field?: strOrNot
}

export interface StandardErrorResponse {
    errors: StandardError[]
}

export interface StandardErrorHandler {
    code: strOrNot
    description: StrOrUn
    traceId?: strOrNot
    field?: strOrNot
    status?: numberOrNot
}
