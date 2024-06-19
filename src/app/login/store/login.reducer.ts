import { INITIAL_STATE } from "@ngrx/store";
import { IAuth } from "../models/login.model";
import { IAuthState } from "../models/login.interface";
import * as LoginActions from "./login.action"
import * as LoginConstant from "./login.constant"

const initialState: IAuthState = {
   auth: null
}

export const loginReducer = (state= initialState, action: LoginActions.LoginActions) => {
    switch (action.type){
        case LoginConstant.AUTHENTICATE_USER:
            return {
                ...state,
                auth: action.payload
            };

        case LoginConstant.LOGOUT_USER:
            return {
                ...state,
                auth: null
            };

        //case LoginConstant.GET_AUTH_USER:
         //   return state

        default:
            return state;
    }
}