import React from 'react';
import { motion,useViewportScroll } from "framer-motion"
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import Design from '../Styles/ProfileScreen.module.css';
import {GetWithAuth} from '../Services/HttpServices';
import { uploadPhoto,getUserPhoto } from '../Services/UserPrefs';
import { connect } from 'react-redux';
import Nav from './Nav';
import swal from 'sweetalert';
const ProfileScreen = (props)=>{
    const navigate = useNavigate();
    const beforeLoad = async()=>{
        console.log(props.username);
        let response = await GetWithAuth("http://192.168.0.13:1998/auth/route","/profile",props.jwtsession);
        if(response.route == "/"){
        //localStorage.removeItem("jwtsession");
        props.setJwtSession("");
        navigate(response.route);
        }
        else{
          navigate(response.route);
        }
        console.log(props.userpicpath);
         }
  useEffect(() =>{
      beforeLoad();
    },[]);
    const uploadFile = async ()=>{
      const choose = document.getElementById("choose");
      choose.click();
      choose.addEventListener("change",async()=>{
      const formData = new FormData();
      formData.append("userpic",choose.files[0]);
      console.log(formData);
      let response = await uploadPhoto("http://192.168.0.13:1998/user/userpic",formData,props.jwtsession);
        if(response.error !=null){
          swal({
            title: response.error,
            text: "Please Try After Some Time",
            icon: "error",
            button: "Close This Alert",
          });
        }
        else{
            props.setPhoto(response.picPath);
            //let url = getUserPhoto("http://192.168.0.18:1998/user/getphoto?location=",picPath);
            //document.getElementById("userphoto").style.backgroundImage = `url(http://192.168.0.17:1998/user/getphoto?location=${props.userpicpath})`;
        }
      });
    }
    return(
        <React.Fragment>
        <Nav username={props.username}/>
        <motion.div className={Design.image} id= "userphoto" whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={uploadFile} style={{backgroundImage:`url(http://192.168.0.13:1998/user/getphoto?location=${props.userpicpath})`}}/>
        <input id='choose' type='file' style={{display:'none'}}/>
        <div className={Design.flexs}>
        <div className={Design.flex}>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>Posts</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>Likes</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>Comments</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>Change Image</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>30 Minute Block</motion.button>
        </div>
        </div>
        </React.Fragment>
    );
}
const mapStateToProps = (state)=>{
  return{
    userpicpath:state.userpicpath,
    jwtsession:state.jwtsession
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setPhoto: (userpicpath) =>{dispatch({'type':'SET_USERPIC',userpicpath})},
    setJwtSession: (jwtsession) => (dispatch({'type':'SET_JWTSESSION',jwtsession}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);