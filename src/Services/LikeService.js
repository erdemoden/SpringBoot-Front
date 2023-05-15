

export const getLikes = async(url,jwtsession,param)=>{

    let response = await fetch(url+"posts="+param,{
        method: "GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await response.json();
}