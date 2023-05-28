export const CreateOnePost = async (url,title,post,jwt)=>{
const response = await fetch(url,{
    method:"POST",
    body:JSON.stringify({
        post:post,
        blogTitle:title
    })
    ,headers:{
        "Content-Type":"application/json",
        "Authorization":jwt,
    }
});
return await response.json();
}
export const GetPostsByUser = async (url,jwtsession)=>{
    let request = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await request.json();
}
export const GetLikesByUser = async(url,jwtsession)=>{
    let request = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await request.json();
}