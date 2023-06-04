import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import Design from '../Styles/ProfileScreen.module.css';
import {GetWithAuth} from '../Services/HttpServices';
import { getUsersPhoto } from '../Services/UserPrefs';
import { useLocation, useNavigate} from 'react-router-dom';
import formdesign from'../Styles/FormDesign.module.css'
import { Oval } from 'react-loader-spinner';
import {motion} from 'framer-motion';
import swal from 'sweetalert';
import Nav from './Nav';
import { checkAdminAndOwner, createOrDeleteAdmin } from '../Services/BlogService';
const User = (props)=>{
    const [url,setUrl] = useState("");
    const [loading,setLoading] = useState(true);
    const location = useLocation();
    const [ownerBlogs,setOwnerBlogs] = useState([]);
    const [adminBlogs,setAdminBlogs] = useState([]);
    const [refresh,setRefresh] = useState(false);
    const navigate = useNavigate();
    const beforeLoad = async()=>{
        console.log(props.username);
        let response = await GetWithAuth(`${process.env.REACT_APP_ROOT_URL}/auth/route`,"/user",props.jwtsession);
        if(response.route == "/"){
        localStorage.removeItem("jwtsession");
        props.setJwtSession("");
        navigate(response.route);
        }
        else{
        let response2 = await getUsersPhoto(`${process.env.REACT_APP_ROOT_URL}/user/getusersphoto?`,props.jwtsession,location.state.username);
        
        if(response2.error!=null){
            setLoading(false);
            navigate("/homepage");
            swal({
                title: response2.error,
                text: "You Are going to homepage",
                icon: "error",
                button: "Close This Alert",
              });
        }
        else{
          //navigate(response.route);
          console.log(response2);
          props.setUserName(response.username);
          props.setUserPicPath(response.location);
          setUrl(response2.picPath);
          let response3 = await checkAdminAndOwner(`${process.env.REACT_APP_ROOT_URL}/user/checkadminandowner?`,location.state.username,props.jwtsession);
          if(response3.error){
            swal({
              title:"Error",
              text:response3.error,
              icon:"error",
              button:"Close This Alert"
            });
          }
          if(response3.adminBlogs){
            setAdminBlogs(response3.adminBlogs);
            setLoading(false);
          }
          if(response3.ownerBlogs){
            setOwnerBlogs(response3.ownerBlogs)
            setLoading(false);
          }
          else{
            setLoading(false);
          }
          console.log(response3);
        }
        }
        console.log(props.userpicpath);
         }
         useEffect(() =>{
            setLoading(true);
            beforeLoad();
            setRefresh(false);
          },[location.state.username,refresh]);

          const makeAdmin = async(selected)=>{
              let response = await createOrDeleteAdmin(`${process.env.REACT_APP_ROOT_URL}/blogs/createadmin?`,selected,location.state.username,props.jwtsession);
              if(response.error){
                swal({
                  title:"Error",
                  text:response.error,
                  icon:"error",
                  button:"Close This Alert"
                });
              }
              else if(response.success){
                swal({
                  title:"Success",
                  text:response.success,
                  icon:"success",
                  button:"Close This Alert"
                });
                setRefresh(true);
              setLoading(true);
              }
          }
          const removeAdmin = async(selected)=>{
            let response = await createOrDeleteAdmin(`${process.env.REACT_APP_ROOT_URL}/blogs/removeadmin?`,selected,location.state.username,props.jwtsession);
            if(response.error){
              swal({
                title:"Error",
                text:response.error,
                icon:"error",
                button:"Close This Alert"
              });
            }
            else if(response.success){
              swal({
                title:"Success",
                text:response.success,
                icon:"success",
                button:"Close This Alert"
              });
              setAdminBlogs(prevBlogs => prevBlogs.filter(blog => blog.id != selected));
              setRefresh(true);
              setLoading(true);
            }
          }
     if(loading){
        return (
            <React.Fragment>
            <Nav username={props.username}/>
            <div className={formdesign.loading}>
              <Oval
              width="100"
              height="100"
              color="black"
              ariaLabel='loading'
              />
            </div>
            </React.Fragment>
        )
     }     
    return(
        <React.Fragment>
         <Nav username={props.username}/>
          <motion.img src={url} className={Design.image} id= "userphoto" whileHover={{scale:1.1}} whileTap={{scale:0.9}}/>
         <h1>{location.state.username}</h1>
         {ownerBlogs.length>0&& props.username!=location.state.username &&(
          <React.Fragment>
            <select class="form-select"style={{ display:'block',width:'50%',margin:'0 auto'}} aria-label="Default select example" id='select1'>
            { 
              ownerBlogs.map(owner=>{
                  return  <option value={owner.id}>{owner.title}</option>
              })
            }
          </select>
          <button className='btn btn-success' style={{display:"block",margin:"0 auto",marginTop:"10px"}} onClick={()=>{makeAdmin(document.getElementById("select1").value)}}>Make Admin</button>
          </React.Fragment>
         )}
            {adminBlogs.length>0&& props.username!=location.state.username &&(
            <React.Fragment>
            <select class="form-select"style={{ display:'block',width:'50%',margin:'0 auto',marginTop:"10px"}} aria-label="Default select example" id='select2'>
            { 
              adminBlogs.map(admin=>{
                  return  <option value={admin.id}>{admin.title}</option>
              })
            }
          </select>
          <button className='btn btn-danger' style={{display:"block",margin:"0 auto",marginTop:"10px"}} onClick={()=>{removeAdmin(document.getElementById("select2").value)}}>Remove Admin Authority</button>
          </React.Fragment>
         )}
        </React.Fragment>
    )

}
const mapStateToProps = (state)=>{
    return{
      userpicpath:state.userpicpath,
      jwtsession:state.jwtsession,
      username:state.username
    }
  }
  const mapDispatchToProps = (dispatch) =>{
    return{
        setUserName: (username) =>{ dispatch({'type':'SET_NAME',username})},
        setJwtSession: (jwtsession) =>{ dispatch({'type':'SET_JWTSESSION',jwtsession})},
        setUserPicPath:(userpicpath) =>{ dispatch({'type':'SET_USERPIC',userpicpath})},
        setFollowedBlogs:(followedblogs) =>{ dispatch({'type':'SET_FOLLOWEDBLOGS',followedblogs})}
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(User);