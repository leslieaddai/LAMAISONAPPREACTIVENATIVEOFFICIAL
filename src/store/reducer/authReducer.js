import { types } from "../actiontypes"

const inititalState = {
    userAccessKey:{},
}
export const authReducer = (state = inititalState, { type, payload }) => {
    
    switch (type) {
        case types.SIGNUP:
            return {...state, }

        case (types.LOGIN):
            return {...state, userAccessKey:payload }

        case types.LOGOUT:
            return {...state,  userAccessKey:{}}
       
        default:
            return state
    }
}