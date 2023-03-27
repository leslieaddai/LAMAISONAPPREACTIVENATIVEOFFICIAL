import { types } from "../actiontypes"

const inititalState = {
    isLoading:false,
    userAccessKey:{},
}
export const authReducer = (state = inititalState, { type, payload }) => {
    
    switch (type) {
        case types.SIGNUP.success:
            return {...state, isLoading:false }

        case (types.LOGIN.success):
            return {...state, isLoading:false, userAccessKey:payload }

        case types.LOGOUT.success:
            return {...state, isLoading:false, userAccessKey:{}}
       
        default:
            return state
    }
}