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
const User = (props)=>{
    const [url,setUrl] = useState("");
    const [loading,setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const beforeLoad = async()=>{
        console.log(props.username);
        let response = await GetWithAuth(`${process.env.REACT_APP_ROOT_URL}/auth/route`,"/user",props.jwtsession);
        if(response.route == "/"){
        //localStorage.removeItem("jwtsession");
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
          setLoading(false);
        }
        }
        console.log(props.userpicpath);
         }
         useEffect(() =>{
            setLoading(true);
            beforeLoad();
          },[location.state.username]);
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