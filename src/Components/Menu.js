import React from 'react';
import { useEffect, useState } from "react";
import Menustyle from'../Styles/Menu.module.css'
import {useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import {GetWithAuth ,GetWithRefresh} from '../Services/HttpServices';
import { Bounce,Fade, Flip, Roll, Rotate, Slide, Zoom} from 'react-reveal';
import { AnimatePresence, motion } from 'framer-motion';
import {Parallax} from 'react-parallax';
import backgroundImage from "../Images/arkaplan-resim.jpg";
import Create_Post from './Create-Post';
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
      const rotateAndOpen = ()=>{
        if(myslide.isanimated == false){
        setmyslide({isanimated:true});
        }
        else{
          setmyslide({isanimated:false});
        }
      }
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
        <Parallax strength={600} bgImage={backgroundImage} style={{height:"100vh"}}>
        </Parallax>
        <nav className={Menustyle.menu}>
            <h1 className={Menustyle.white}>{"Welcome "+props.username}</h1>
            <motion.div className={Menustyle.hamburger}onClick={rotateAndOpen} id = "hamburgerim" animate={{transform:myslide.isanimated ? "rotate(90deg)":"rotate(0deg)"}}></motion.div>
                     <Bounce left when = {myslide.isanimated}>
   <div className={Menustyle.opened} id = "slidemenu" style={{display : myslide.isanimated ? 'block':'none'}}>
            <div>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Your Writings</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>All Writings</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Liked Writings</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Write A Post</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Public Chat</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Log-Out</button>         
            </div>
            </div>
            </Bounce>
            </nav>
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
            <Create_Post/>
            <Create_Post/>
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