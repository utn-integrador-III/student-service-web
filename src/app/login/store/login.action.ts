import { Action } from "@ngrx/store";
import { IAuth } from "../models/login.model";
import * as LoginConstant from "./login.constant";

export class AuthenticateUser implements Action {
    readonly type = LoginConstant.AUTHENTICATE_USER;
    constructor(public payload: IAuth) { }
}

export class LogoutUser implements Action {
    readonly type = LoginConstant.LOGOUT_USER;
}


export type LoginActions = 
    | AuthenticateUser
    | LogoutUser;