
export const uploadPhoto = async(url,photo)=>{

    let response = await fetch(url,{
        method:'POST',
headers:{
    "Authorization":localStorage.getItem("jwtsession")
},
body:photo
    });
    return await response.json();
}
export const getUserPhoto = async(url,path)=>{
let response = await fetch(url+path);
return response;
}