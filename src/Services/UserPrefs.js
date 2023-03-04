
export const uploadPhoto = async(url,photo,jwtsession)=>{
    let response = await fetch(url,{
        method:'POST',
headers:{
    "Authorization":jwtsession
},
body:photo
    });
    return await response.json();
}
export const getUserPhoto = async(url,path)=>{
let response = await fetch(url+path);
return response;
}