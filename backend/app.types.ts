import {StatusCodes} from 'http-status-codes';

export interface ErrorRO {
    statusCode: StatusCodes;
    message: string;
}
