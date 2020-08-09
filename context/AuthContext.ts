import { createContext } from 'react'

export const AuthContext = createContext<any | undefined>(undefined);
export const AuthProvider = AuthContext.Provider;
export const Consumer = AuthContext.Consumer;

export let initialState = {
    isAuthenticated: false,
    authToken: '',
    schoolCode: '',
    adminPhoneNumber: '',
    schoolID: ''
};

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                ...action.payload,
                isAuthenticated: action.payload.authToken ? true : false
            }
        case "LOGOUT":
            return {
                isAuthenticated: false,
                userToken: '',
                schoolCode: '',
                adminPhoneNumber: ''
            }
        default:
            return state
    }
};