
export const getLikes = async(url,jwtsession,param)=>{

    let response = await fetch(url+"posts="+param,{
        method: "GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await response.json();
}

export const createLike = async(url,jwtsession,postid)=>{
    let response = await fetch(url,{
        method:"POST",
        body:JSON.stringify({
            postid:postid
        }),
        headers:{
            "Authorization":jwtsession,
            "Content-Type":"application/json"
        }
    });
    return await response.json();
}

export const deleteLike = async(url,jwtsession,post)=>{
    let response = await fetch(url+"/"+post,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await response.json();
}

export const isLikedByUser = async(url,jwtsession,post)=>{
    let response = await fetch(url+"postId="+post,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await response.json();
}