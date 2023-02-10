import React from 'react';
import { motion,useViewportScroll } from "framer-motion"
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import Design from '../Styles/ProfileScreen.module.css';
import {GetWithAuth} from '../Services/HttpServices';
import Nav from './Nav';
const ProfileScreen = (props)=>{
    const navigate = useNavigate();
    const beforeLoad = async()=>{
        console.log(props.username);
        let response = await GetWithAuth("http://192.168.0.23:1998/auth/route","/profile");
        if(response.route == "/"){
        localStorage.removeItem("jwtsession");
        navigate(response.route);
        }
        else{
          navigate(response.route);
        }
         }
  useEffect(() =>{
      beforeLoad();
    },[]);
    const uploadFile = async ()=>{
      const choose = document.getElementById("choose");
      choose.click();
      choose.addEventListener("change",()=>{
      const formData = new FormData();
      formData.append("userpic",choose.files[0]);
      });
    }
    return(
        <React.Fragment>
        <Nav username={props.username}/>
        <motion.div className={Design.image} whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={uploadFile}/>
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
export default ProfileScreen;