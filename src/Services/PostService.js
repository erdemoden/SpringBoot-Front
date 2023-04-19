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