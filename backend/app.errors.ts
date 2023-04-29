import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
    public statusCode: StatusCodes;

    constructor(statusCode: StatusCodes, msg: string) {
        super(`Api error : ${msg}`);
        this.statusCode = statusCode;
    }
}