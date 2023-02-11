
export const uploadPhoto = async(url,photo)=>{

    let post = await fetch(url,{
        method:'POST',
headers:{
    "Authorization":localStorage.getItem("jwtsession")
},
body:photo
    });
}