import { IAuthState } from "../models/login.interface";
import * as LoginActions from "./login.action";
import * as LoginConstant from "./login.constant";

const initialState: IAuthState = {
   auth: null
}

export const loginReducer = (state = initialState, action: LoginActions.LoginActions) => {
    switch (action.type) {
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

        default:
            return state;
    }
}
