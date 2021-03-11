import { apiDelete, apiGet, apiPost, apiPut, getUserData, setUserData } from "../utils/utils";
import {SIGNUP,LOGIN} from '../config/urls';


export function signUp(data = {}) {
  return new Promise((resolve,reject)=>{
    apiPost(SIGNUP,data).then(res=>{
      setUserData(res.data)
      // console.log(getUserData(),"svbwibweowe")
      resolve(res);
    }).catch(error=>{
      reject(error);
    })
  })
  
   
  }
  
  export function login(data = {}) {
 
    return new Promise((resolve,reject)=>{
      apiPost(LOGIN,data).then(res=>{
        setUserData(res.data)
        // console.log(getUserData(),"svbwibweowe")
        resolve(res);
      }).catch(error=>{
        reject(error);
      })
    })
}
