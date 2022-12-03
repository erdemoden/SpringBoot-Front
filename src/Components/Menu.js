import React from 'react';
import { useEffect, useState } from "react";
import Menustyle from'../Styles/Menu.module.css'
import {useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import {GetWithAuth ,GetWithRefresh} from '../Services/HttpServices';
import { Bounce,Fade, Flip, Roll, Rotate, Slide, Zoom} from 'react-reveal';
import { AnimatePresence, motion, useViewportScroll} from 'framer-motion';
import { Parallax,ParallaxProvider,ParallaxBanner } from 'react-scroll-parallax';
import backgroundImage from "../Images/arkaplan-resim.jpg";
import Create_Post from './Create-Post';
import Nav from './Nav';
const axios = require('axios');
let rotation = 0;
const Menu = (props)=>{
    const navigate = useNavigate();
    const {scrollYProgress} = useViewportScroll();
    console.log(scrollYProgress);
    // const [myslide,setmyslide] = useState(
    //   {
    //     isanimated:false
    //   }
    // );
        const beforeLoad = async()=>{
          let response = await GetWithAuth("http://localhost:1998/auth/route");
          if(response.route == "/"){
          localStorage.removeItem("jwtsession");
          navigate(response.route);
          }
          else{
            props.setUserName(response.username);
            document.body.className = Menustyle.deneme;
            document.getElementById("background").className = Menustyle.backwithoutscroll;
            navigate(response.route);
          }
           }

    useEffect(() =>{
        beforeLoad();
      },[]);
      //fixed-top flex
      //navbar navbar-dark bg-dark 
      // window.addEventListener("scroll",()=>{
      //   if(window.scrollY >= 70*window.innerHeight/100){
      //  document.getElementById("background").className = Menustyle.deneme3;
      //   }
      //   else{
      //     //document.getElementById("background").className = Menustyle.deneme;
      //   }
      // })
    return ( 
      <React.Fragment>
            <Nav username={props.username}/>
            <Create_Post/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Create_Post/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Create_Post/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Create_Post/>
            </React.Fragment>
    );
}

const mapStateToProps = (state)=>{
  return{
    username:state.username
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setUserName: (username) =>{ dispatch({'type':'SET_NAME',username})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Menu);