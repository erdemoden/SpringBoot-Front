import React from 'react';
import { useEffect, useState } from "react";
import Menustyle from'../Styles/Menu.module.css'
import {useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import {GetWithAuth ,GetWithRefresh} from '../Services/HttpServices';
import { Bounce,Fade, Flip, Roll, Rotate, Slide, Zoom} from 'react-reveal';
import { motion } from 'framer-motion';
const axios = require('axios');
let rotation = 0;
const Menu = (props)=>{
    const navigate = useNavigate();
    const [myslide,setmyslide] = useState(
      {
        isanimated:false
      }
    );
        const beforeLoad = async()=>{
          document.body.className = Menustyle.deneme;
          let response = await GetWithAuth("http://localhost:1998/auth/route");
          if(response.route == "/"){
          localStorage.removeItem("jwtsession");
          navigate(response.route);
          }
          else{
            props.setUserName(response.username);
            navigate(response.route);
          }
           }

    useEffect(() =>{
        beforeLoad();
      },[]);
      //fixed-top flex
      //navbar navbar-dark bg-dark 
      const rotateAndOpen = ()=>{
        if(myslide.isanimated == false){
        setmyslide({isanimated:true});
        }
        else{
          setmyslide({isanimated:false});
        }
      }
    return ( 
      <React.Fragment>
        <nav className={Menustyle.menu}>
            <h1 className={Menustyle.white}>{"Welcome "+props.username}</h1>
            <motion.div className={Menustyle.hamburger}onClick={rotateAndOpen} id = "hamburgerim" animate={{transform:myslide.isanimated ? "rotate(90deg)":"rotate(0deg)"}}></motion.div>
            </nav>
            <motion.div className={Menustyle.opened} id = "slidemenu" animate = {{opacity:myslide.isanimated ? 1:0,y:myslide.isanimated ? 0:-30}} transition = {{duration:1.5,ease:"easeOut"}}>
            <div className={Menustyle.slidedown}>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Your Writings</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>All Writings</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Public Chat</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Log-Out</button>         
            </div>
            </motion.div>
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