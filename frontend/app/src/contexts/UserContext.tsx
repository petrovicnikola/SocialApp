import { createContext, useReducer } from "react";
import { User } from "../models/User";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

type UserState = {
    user: User | null;
}

type UserAction = {
    type: typeof LOGIN | typeof LOGOUT;
    payload?: User;
}

export const UserContext = createContext<{state: UserState; dispatch: React.Dispatch<UserAction>} | undefined>(undefined);

export const userReducer = (state: any, action: any) => {
    switch(action.type){
        case 'LOGIN': {
            return {
                user: action.payload
            }
        }
        case 'LOGOUT': {
            return {
                user: null
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