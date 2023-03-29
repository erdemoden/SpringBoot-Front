
export const CreateNewBlog = async (url,title,subject,jwtsession)=>{
  
    let response = await fetch(url,{
        method:"POST",
        body:JSON.stringify({
            title:title,
            subject:subject
        }),
        credentials:'include',
        headers:{
            "Content-Type":"application/json",
            "Authorization":jwtsession,
        }
    });
    return await response.json();
}

export const GetBlogsByUserId = async (url,jwtsession)=>{
    let request = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
}