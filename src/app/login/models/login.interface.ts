import { IAuth } from "./login.model";

export interface IAuthState {
    auth: IAuth | null;
}

export class IAuthResponse {
    auth: IAuth | null;
    isError: boolean;
    errorMessage: string;
}