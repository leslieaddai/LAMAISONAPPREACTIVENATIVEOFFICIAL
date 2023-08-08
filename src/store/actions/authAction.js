import  AsyncStorage  from "@react-native-async-storage/async-storage"
import { httpRequest, url } from "../../config"
import { types } from "../actiontypes"
import { postData } from "./actionMethod"

export const signup = (data, callback) =>dispatch=>{   
    postData(dispatch , url.signup, data, null, types.SIGNUP, null ,callback)
} 

export const login = (data, callback) => dispatch=>{

    postData(dispatch, url.login, data, null, types.LOGIN, null ,callback)
} 

export const logout =callback=> async dispatch =>{
        dispatch({type:types.LOGOUT})
        callback && callback()
}