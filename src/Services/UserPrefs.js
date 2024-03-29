
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

export const getUsersPhoto = async(url,jwtsession,username)=>{
    let request = await fetch(url+"username="+username,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await request.json();
}

export const thirtyMinuteBlock = async(url,jwtsession)=>{
    let request = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
}

export const deleteTimeBlock = async(url,jwtsession)=>{
    let request = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
}

export const isUserBlockExist = async(url,jwtsession)=>{
    let request = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await request.json();
}
