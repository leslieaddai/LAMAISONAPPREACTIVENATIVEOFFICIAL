import { httpRequest } from "../../config";
import { setToast } from "./toastAction";
import { store } from "../index";

export const postData=async (dispatch, url,data, header ,types,successMsg, callback,successNotifyStatus='success')=> {
    try {
    
        if(typeof url !== 'string') return alert (url.toString())
        dispatch({type:types.start})
       console.log("cccccccccccccccccccccccccc",data, header)
        const response= await httpRequest.post(url,data,header)
        const result= response.data
        // let temp= data // the reason to save data in temp is because it becomes undefined once twe get the result
        
        console.log('POST DATA.............................................',result)
        if(result.error) throw result.error
        if( result.result && result.result==='Please enter correct password') throw result.result
        if(result.code && result.code !==200) throw result.message
        else {
            // console.log('data',temp)
            
            // let data = url==='login'?{...result,username:temp.username }:result
            // alert(result.message)
            dispatch({type: types.success, payload: result.data })
            callback && callback(result.data)
            dispatch(setToast(successNotifyStatus, result.message||successMsg))   
            
        }
      
        
    } catch (error) {
        console.log("Error from action postData from  url",url, types, error, error.message, typeof error ==='string')
        dispatch({type:types.failed})
        // error.message|| error && 
        dispatch(setToast('error',typeof error ==='string'? error: error.message))
    }   

}