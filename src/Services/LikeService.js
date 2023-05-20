

export const getLikes = async(url,jwtsession,param)=>{

    let response = await fetch(url+"posts="+param,{
        method: "GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await response.json();
}

export const createLike = async(url,jwtsession,post)=>{
    let response = await fetch(url,{
        method:"POST",
        headers:{
            "Authorization":jwtsession
        },
        body:{
            postid:post
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