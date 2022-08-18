import React from 'react';
import { useEffect, useState } from "react";
import Menustyle from'../Styles/Menu.module.css'
import {useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import {GetWithAuth ,GetWithRefresh} from '../Services/HttpServices';
import { Bounce } from 'react-reveal';
const axios = require('axios');
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
        setmyslide({isanimated:true});
        let hamburgerMenu = document.getElementById("hamburgerim");
        let rotation = 0;
        let animation = setInterval(()=>{
          if(rotation == 90){
            clearInterval(animation);
          }
          hamburgerMenu.style.transform = "rotate("+rotation+"deg"+")";
          rotation+=5;
        },10);
      }
    return ( 
      <React.Fragment>
        <nav className={Menustyle.menu}>
            <h1 className={Menustyle.white}>{"Welcome "+props.username}</h1>
            <div className={Menustyle.hamburger}onClick={rotateAndOpen} id = "hamburgerim"></div>
            </nav>
            <Bounce top when={myslide.isanimated}>
            <div className={Menustyle.opened} id = "slidemenu">
            <div className={Menustyle.slidedown}>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Your Writings</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>All Writings</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Public Chat</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Log-Out</button>         
            </div>
            </div>
            </Bounce>
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