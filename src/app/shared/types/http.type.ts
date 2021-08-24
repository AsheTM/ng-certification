import { EHttpErrorCode } from "../enums";


export type THttpError = {
    code:       EHttpErrorCode;
    message?:   string;
};
