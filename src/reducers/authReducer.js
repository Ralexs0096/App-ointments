import { types } from "../types/types";

const initalState = {
    checking: true,
    // uid: null,
    // name: null
}

export const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }
        case types.checkingFinish:
            return {
                ...state,
                checking: false
            }
        case types.authLogout: 
            return {
                checking: false
            }
        case types.eventLogout:
            return {
                ...initalState
            }
    
        default:
            return state;
    }
}