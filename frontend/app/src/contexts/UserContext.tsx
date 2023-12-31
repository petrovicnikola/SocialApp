import { createContext, useReducer } from "react";
import { User } from "../models/User";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE = 'UPDATE';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_BIO = 'UPDATE_BIO';

type UserState = {
    user: User | null;
}

type UserAction = {
    type: typeof LOGIN | typeof LOGOUT | typeof UPDATE | typeof UPDATE_LOCATION | typeof UPDATE_BIO;
    payload?: User;
}

export const UserContext = createContext<{state: UserState; dispatch: React.Dispatch<UserAction>} | undefined>(undefined);

export const userReducer = (state: any, action: any) => {
    switch(action.type){
        case 'LOGIN': {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                user: action.payload
            }
        }
        case 'LOGOUT': {
            if (localStorage.getItem('user')){
                localStorage.removeItem('user');
            }
            return {
                user: null
            }
        }
        case 'UPDATE': {
            let userStr = localStorage.getItem('user');
            let user = null;
            if (userStr){
                user = JSON.parse(userStr);
                user.photo = action.payload;
                localStorage.setItem('user', JSON.stringify(user));
            }
            return {
                user: user
            }
        }
        case 'UPDATE_LOCATION': {
            let userStr = localStorage.getItem('user');
            let user = null;
            if (userStr){
                user = JSON.parse(userStr);
                user.location = action.payload;
                localStorage.setItem('user', JSON.stringify(user));
            }
            return {
                user: user
            }
        }
        case 'UPDATE_BIO': {
            let userStr = localStorage.getItem('user');
            let user = null;
            if (userStr){
                user = JSON.parse(userStr);
                user.bio = action.payload;
                localStorage.setItem('user', JSON.stringify(user));
            }
            return {
                user: user
            }
        }
        default:{
            return state;
        }
    }
}

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, {user: null});
    
    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}