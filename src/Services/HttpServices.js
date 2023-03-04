//import { json } from "express/lib/response";
import cookies from 'js-cookie'

export const PostWithAuth = async(url,body,jwtsession)=>{
var request = await fetch(url,{
method:'POST',
headers:{
    "Content-Type":"application/json",
    "Authorization":jwtsession
},
body:JSON.stringify(body)

});
return request;
}
 export const GetWithAuth = async(url,route,jwtsession)=>{
   const response = await fetch(url,{
        method:'GET',
        withCredentials:true,
        headers:{
            "Content-Type":"application/json",
            "Authorization":jwtsession,
            "Route":route
        }
    });
    console.log(jwtsession);
    return await response.json();
}

export const beforeRegister = async(url,username,email,password)=>{
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
          },
           credentials:'include',
          body: JSON.stringify({username:username, email:email,password:password})
    });
    return await response.json();
}

export const registerWithMail = async(url,code)=>{
const response = await fetch(url,{
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify({key:code})
});
return await response.json();
}
export const beforeLogin = async(url,username,password)=>{
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify({mailOrEmail:username,password:password})
    });
    return await response.json();
}