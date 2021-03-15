import { apiDelete, apiGet, apiPost, apiPut, getUserData, setUserData } from "../utils/utils";
import {UPLOAD_IMAGE} from '../config/urls';


export function uploadImage(data={}){
    console.log("data=>",JSON.stringify(data))
    const headers = {'Content-Type': 'multipart/form-data'};
    return apiPost(UPLOAD_IMAGE,data,headers);
 }
 
  

