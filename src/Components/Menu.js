import React from 'react';
import Menustyle from'../Styles/Menu.module.css'
import {useNavigate} from 'react-router-dom';
import { useState ,useEffect } from 'react';
import { connect } from 'react-redux';
import {GetWithAuth ,GetWithRefresh} from '../Services/HttpServices';
const axios = require('axios');
const Menu = (props)=>{
    const navigate = useNavigate();
        const beforeLoad = async()=>{
          let body = document.getElementsByClassName("deneme")[0].className = Menustyle.deneme;
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
    
    return ( 
        <nav className={'navbar navbar-dark bg-dark fixed-top flex ortalamenu'+Menustyle.shadow}>
            <h1 className={Menustyle.white}>{"Welcome "+props.username}</h1>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Your Writings</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>All Writings</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Public Chat</button>
            <button type="button" className='btn btn-success' id={Menustyle.buttons}>Log-Out</button>         
            </nav>
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