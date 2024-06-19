import { ActionReducerMap } from "@ngrx/store"
import { IAuthState } from "../login/models/login.interface";
import * as fromLogin from "../login/store/login.reducer"

export interface AppState{
    auth: IAuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromLogin.loginReducer
};