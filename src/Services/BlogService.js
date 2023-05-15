
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

export const checkOwner = async (url,jwtsession,username,title)=>{
    let request = await fetch(url+"username="+username+"&title="+title,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await request.json();
}

export const userBlogLike = async(url,jwtsession,name)=>{
    let request = await fetch(url+"name="+name,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    });
    return await request.json();
}

export const findByTitle = async(url,jwtsession,title)=>{
    let request = await fetch(url+"title="+title,{
        method:"GET",
        headers:{
            "Authorization":jwtsession
        }
    }); 
    return await request.json();
}