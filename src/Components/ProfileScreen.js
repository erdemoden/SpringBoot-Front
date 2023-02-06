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
        let response = await GetWithAuth("http://192.168.0.18:1998/auth/route","/profile");
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

    return(
        <React.Fragment>
        <Nav username={props.username}/>
        <motion.div className={Design.image} whileHover={{scale:1.1}} whileTap={{scale:0.9}}/>
        <div className={Design.flex}>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>Posts</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>Likes</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>Comments</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>Change Image</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>30 Minute Block</motion.button>
        </div>
        </React.Fragment>
    );
}
export default ProfileScreen;