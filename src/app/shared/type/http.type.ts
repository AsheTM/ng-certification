import { EHttpErrorCode } from "../enum";


export type THttpError = {
    code:       EHttpErrorCode;
    message?:   string;
};
