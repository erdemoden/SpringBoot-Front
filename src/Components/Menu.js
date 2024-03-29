import React from 'react';
import { useEffect, useState } from "react";
import Menustyle from'../Styles/Menu.module.css'
import {useNavigate,useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import {GetWithAuth ,GetWithRefresh} from '../Services/HttpServices';
import { Bounce,Fade, Flip, Roll, Rotate, Slide, Zoom} from 'react-reveal';
import { AnimatePresence, motion, useViewportScroll} from 'framer-motion';
import { Parallax,ParallaxProvider,ParallaxBanner } from 'react-scroll-parallax';
import backgroundImage from "../Images/arkaplan-resim.jpg";
import Swal from 'sweetalert2';
import Create_Post from './Create-Post';
import Nav from './Nav';
import { isUserBlockExist } from '../Services/UserPrefs';
const axios = require('axios');
let rotation = 0;
const Menu = (props)=>{
    const navigate = useNavigate();
    const location = useLocation();
    const {scrollYProgress} = useViewportScroll();
    console.log(scrollYProgress);
        const beforeLoad = async()=>{
          console.log(props.username);
          let response = await GetWithAuth(`${process.env.REACT_APP_ROOT_URL}/auth/route`,"/homepage",props.jwtsession);
          let response2 = await isUserBlockExist(`${process.env.REACT_APP_ROOT_URL}/user/isuserblockexist`,props.jwtsession);
          if(response.route == "/"){
          props.setJwtSession("");
          //localStorage.removeItem("jwtsession");
          navigate(response.route);
          }
          else{
            props.setUserName(response.username);
            props.setUserPicPath(response.location);
            props.setFollowedBlogs(response.followedblogs);
            props.setBlocked(response2);
            console.log(response.followedblogs);
            document.body.className = Menustyle.deneme;
            //document.getElementById("background").className = Menustyle.backwithoutscroll;
            console.log(props.followedblogs[0]);
            navigate(response.route);
          }
           }
           useEffect(() => {
            if (!props.userpicpath || props.userpicpath.length === 0) {
              props.setUserPicPath(process.env.REACT_APP_USER_LOGO);
            }
          }, [props.userpicpath]);
          
    useEffect(() =>{
        beforeLoad();
      },[]);
    return ( 
      <React.Fragment>
        <Nav username={props.username}/>
        </React.Fragment>           
    );
}

const mapStateToProps = (state)=>{
  return{
    username:state.username,
    jwtsession:state.jwtsession,
    userpicpath:state.userpicpath,
    followedblogs:state.followedblogs
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setUserName: (username) =>{ dispatch({'type':'SET_NAME',username})},
    setJwtSession: (jwtsession) =>{ dispatch({'type':'SET_JWTSESSION',jwtsession})},
    setUserPicPath:(userpicpath) =>{ dispatch({'type':'SET_USERPIC',userpicpath})},
    setFollowedBlogs:(followedblogs) =>{ dispatch({'type':'SET_FOLLOWEDBLOGS',followedblogs})},
    setBlocked: (blocked) => { dispatch({'type':'SET_BLOCK',blocked})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Menu);