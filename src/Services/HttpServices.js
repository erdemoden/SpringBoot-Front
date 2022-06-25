//import { json } from "express/lib/response";
import cookies from 'js-cookie'

export const PostWithAuth = async(url,body)=>{
var request = await fetch(url,{
method:'POST',
headers:{
    "Content-Type":"application/json",
    "Authorization":cookies.get("acs")
},
body:JSON.stringify(body)

});
return request;
}
export const GetWithRefresh = async(url)=>{
    var response = await fetch(url,{
        method:'GET',
        withCredentials:true,
        headers:{
            "Content-Type":"application/json",
            "Authorization":cookies.get("rfs")
        }
    });
    return await response.json();
}
 export const GetWithAuth = async(url)=>{
   const response = await fetch(url,{
        method:'GET',
        withCredentials:true,
        headers:{
            "Content-Type":"application/json",
            "Authorization":cookies.get("acs")
        }
    });
    return await response.json()
}