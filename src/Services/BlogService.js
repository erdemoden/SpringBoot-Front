
export const CreateBlog = async (url,title,subject,jwtsession)=>{
  
    let request = await fetch(url,{
        method:"POST",
        body:{
            title:title,
            subject:subject
        },
        headers:{
            "Content-Type":"application/json",
            "Authorization":jwtsession,
        }
    });
}

export const GetBlogsByUserId = async (url,jwtsession)=>{
    let request = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
}