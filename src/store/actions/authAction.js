import  AsyncStorage  from "@react-native-async-storage/async-storage"
import { setToast } from "./toastAction"
import { httpRequest, url } from "../../config"
import { types } from "../actiontypes"
import { message } from "../message"
import { postData } from "./actionMethod"

export const signup = (data, callback) =>dispatch=>{   
    postData(dispatch , url.signup, data, null, types.SIGNUP, null ,callback)
} 

export const login = (data, callback) => dispatch=>{

    postData(dispatch, url.login, data, null, types.LOGIN, message.login.success ,callback)
} 

export const logout =callback=> async dispatch =>{
        dispatch({type:types.LOGOUT})
        callback && callback()
}