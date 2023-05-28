
export const createComment = async(url,postId,comment,jwtsession)=>{
    const response = await fetch(url,{
        method:"POST",
        body:JSON.stringify({
            postId:postId,
            comment:comment
        }),
        headers:{
            "Content-Type":"application/json",
            "Authorization":jwtsession
        }
    });
    return response.json();
}