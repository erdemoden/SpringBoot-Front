//import { json } from "express/lib/response";
import cookies from 'js-cookie'

export const PostWithAuth = async(url,body)=>{
var request = await fetch(url,{
method:'POST',
headers:{
    "Content-Type":"application/json",
    "Authorization":localStorage.getItem("jwtsession")
},
body:JSON.stringify(body)

});
return request;
}
 export const GetWithAuth = async(url)=>{
   const response = await fetch(url,{
        method:'GET',
        withCredentials:true,
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("jwtsession")
        }
    });
    return await response.json();
}